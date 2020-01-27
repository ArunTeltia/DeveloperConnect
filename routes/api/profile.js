const express = require('express');
const router=express.Router();
const auth = require('../../middleware/auth');
const {check ,validationResult} = require('express-validator'); //express-validator/check is deprecated

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


//@route Post api/profile
//@desc create or update user profile
//@acess private
router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skill','Skills is required').not().isEmpty()
        ]
    ],
    async (req,res)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const{
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        }= req.body;

        const profileFields ={};

        profileFields.user=req.user.id;

        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // console.log(profileFields.skills);

        // res.send('Hello')
        // Build social object
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try{
            let profile = Profile.findOne({user :req.user.id});

            if(profile){
                profile = await Profile.findOneAndUpdate({user:req.user.id},{ $set:
                profileFeilds},
                {new:true}
                );
                return res.json(profile);

            }
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});
//@route get api/profile
//@desc get all profiles
//@access public
router.get('/', async (req,res)=>{
    try {
        const profiles =await Profile.find().populate('user',['name','avatar']); 
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
}); 
//@route get api/profile/user/:user_id
//@desc get profile by user id
//@access public
router.get('/', async (req,res)=>{
    try {
        const profiles =await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']); 
    
    if(!profile) 
        return res.status(400).json({msg:'Profile not found'});
    res.json(profile);
    } catch (err) { 
        console.error(err.message);
        if(err.kind=='ObjectId'){
            return res.status(400).json({msg:'Profile not found'});   
        }
        res.status(500).send('Server Error');

    }
}); 

//@route delete api/profile
//@desc delete profile ,user& POSTS 
//@access pRIVATE
router.delete('/',auth, async (req,res)=>{
    try {
        //@todo - remove users posts
        //Remove Profile
        await Profile.findOneAndDelete({user:req.user.id});
        //Remove user
        await User.findOneAndDelete({_id:req.user.id}); 
        
        res.json({msg:'User removed'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
}); 


module.exports =router;