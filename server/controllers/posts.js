const mongoose = require("mongoose");
const Post = require("../model/Post");

const validatePostInput = require("../validation/post");

module.exports = {
  createPost: async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check for validity
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Create a new post
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    try {
      const post = await newPost.save();
      return res.json(post);
    } catch (error) {
      errors.post = "Cannot create post";
      return res.status(400).json({
        errors,
        success: false
      });
    }
  }
};
