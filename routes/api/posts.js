const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../model/Post");
const Profile = require("../../model/Profile");
const User = require("../../model/User");

//@route Post api/posts
//@desc Create a post
//@acess Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.body.id
      });

      const post = await newPost.save();
      //so that we have a post as a variable and we can send as a response

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route get api/posts
//@desc  get all posts
//@acess Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({date:-1});
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route get api/posts/:id
//@desc  get post by ID
//@acess Private
router.get("/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
 
      if(!post){
          return res.statusMessage(404).json({msg:'Post not found'});
      }
      res.json(posts) ; 
    } catch (err) {

      console.error(err.message);
      if(err.kind==='ObjectId'){
          //the id that we are passing dont exist
        return res.statusMessage(404).json({msg:'Post not found'});
    }
      res.status(500).send("Server Error");
    }
  });
module.exports = router;
