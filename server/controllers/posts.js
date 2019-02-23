const mongoose = require("mongoose");
const Post = require("../model/Post");

const validatePostInput = require("../validation/post");

module.exports = {
  // Get all posts
  getPosts: async (req, res) => {
    try {
      let posts = await Post.find({})
        .sort({ date: -1 })
        .populate("users", ["name", "avatar"]);

      return res.json(posts);
    } catch (error) {
      return res.json({
        errors: "Did not find any post",
        success: false
      });
    }
  },

  // Get a single post
  getPost: async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);

      return res.json(post);
    } catch (error) {
      return res.json({
        errors: "Did not find that post",
        success: false
      });
    }
  },

  // Create a new post
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
  },

  // Delete a single post
  deletePost: async (req, res) => {
    try {
      let post = await Post.findByIdAndDelete(req.params.id);

      if (!post) {
        return res.json({
          success: false,
          errors: "No such post found"
        });
      } else {
        return res.json({
          success: true
        });
      }
    } catch (error) {
      return res.json({
        errors: "Did not find that post",
        success: false
      });
    }
  }
};
