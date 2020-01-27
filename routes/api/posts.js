const express = require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const auth = require('../../middleware/auth')
//@route Post api/posts
//@desc Create a post
//@acess Private
router.get('/',(req,res) => res.send('Post route'));


module.exports =router;