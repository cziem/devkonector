const mongoose = require("mongoose");
const Post = require("../model/Post");
const Profile = require("../model/Profile");

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
    const errors = {};
    try {
      let post = await Post.findById(req.params.id);

      if (!post) {
        errors.noPost = "No such post found";
        return res.status(404).json({
          success: false,
          errors
        });
      } else {
        if (post.user.toString() !== req.user.id) {
          errors.notAuthorized = "User not authorized for this operation";

          return res.status(401).json({
            errors,
            success: false
          });
        } else {
          const removedPost = await post.remove();
          return res.json({ success: true });
        }
      }
    } catch (error) {
      return res.status(404).json({
        errors: "Did not find that post",
        success: false
      });
    }
  },

  // Like a post
  like: async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        errors.noProfile =
          "User has no profile, Probably not a registered user!";

        return res.status(400).json({
          errors,
          success: false,
          message: "Please create a profile"
        });
      } else {
        let post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
          errors.noPost = "No such post found";
          return res.status(404).json({
            success: false,
            errors
          });
        }

        // Check if user has like the post already
        const isLiked = post.likes.filter(
          like => like.user.toString() === req.user.id
        );

        if (isLiked.length > 0) {
          errors.isLiked = "User already liked this post";
          return res.status(400).json({
            errors,
            success: false
          });
        }

        // Add the user to the likes array
        post.likes.unshift({ user: req.user.id });

        let likedPost = await post.save();
        res.json(likedPost);
      }
    } catch (error) {
      errors.noProfile = "User has no profile, Probably not a registered user!";
      return res.status(401).json({
        errors,
        message: "Please sign up",
        success: false
      });
    }
  }
};
