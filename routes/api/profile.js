const express = require('express');
const router=express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../model/Profile');
const user = require('../../model/User');
//@route GET api/profile/me
//@desc get current user profile
//@acess private
router.get('/me',auth , async (req,res) => {
    try{
        const profile = await (await Profile.findOne({user:req.user.id})).populated('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//now we have to make a route that create a file of me as there is no profile present for now

module.exports =router;