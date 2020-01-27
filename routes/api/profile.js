const express = require('express');
const router=express.Router();
const auth = require('../../middleware/auth')

//@route GET api/profile/me
//@desc get current user profile
//@acess private
router.get('/',(req,res) => res.send('Profile route'));


module.exports =router;