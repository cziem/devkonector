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
        errors: "Did not find any post"
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
        errors: "Did not find that post"
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
      return res.status(400).json(errors);
    }
  },

  // Delete a single post
  deletePost: async (req, res) => {
    const errors = {};
    try {
      let post = await Post.findById(req.params.id);

      if (!post) {
        errors.noPost = "No such post found";
        return res.status(404).json(errors);
      } else {
        if (post.user.toString() !== req.user.id) {
          errors.notAuthorized = "User not authorized for this operation";

          return res.status(401).json(errors);
        } else {
          const removedPost = await post.remove();
          return res.json({ success: true });
        }
      }
    } catch (error) {
      errors.noPost = "Did not find that post";
      return res.status(404).json(errors);
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

        return res.status(400).json(errors);
      } else {
        let post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
          errors.noPost = "No such post found";
          return res.status(404).json(errors);
        }

        // Check if user has like the post already
        const isLiked = post.likes.filter(
          like => like.user.toString() === req.user.id
        );

        if (isLiked.length > 0) {
          errors.isLiked = "User already liked this post";
          return res.status(400).json(errors);
        }

        // Add the user to the likes array
        post.likes.unshift({ user: req.user.id });

        let likedPost = await post.save();
        res.json(likedPost);
      }
    } catch (error) {
      errors.noProfile = "User has no profile, Probably not a registered user!";
      return res.status(401).json(errors);
    }
  },

  // Unlike a post
  unlike: async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        errors.noProfile =
          "User has no profile, Probably not a registered user!";

        return res.status(400).json(errors);
      } else {
        let post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
          errors.noPost = "No such post found";
          return res.status(404).json(errors);
        }

        // Check if user has like the post already
        const isLiked = post.likes.filter(
          like => like.user.toString() === req.user.id
        );

        if (isLiked.length === 0) {
          errors.isLiked = "User has not liked this post yet";
          return res.status(400).json(errors);
        }

        // Find the removeIndex
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // Splice out the user from the likes array
        post.likes.splice(removeIndex, 1);

        let unlikedPosts = await post.save();
        res.json(unlikedPosts);
      }
    } catch (error) {
      errors.noProfile = "User has no profile, Probably not a registered user!";
      return res.status(401).json(errors);
    }
  },

  // Add a comment post
  addComment: async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check for validity
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        errors.noProfile =
          "User has no profile, Probably not a registered user!";

        return res.status(400).json(errors);
      } else {
        let post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
          errors.noPost = "No such post found";
          return res.status(404).json(errors);
        }

        // Create new comment
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add comment to comments array
        post.comments.unshift(newComment);

        let postComment = await post.save();
        res.json(postComment);
      }
    } catch (error) {
      errors.noProfile = "User has no profile, Probably not a registered user!";
      return res.status(401).json(errors);
    }
  },

  // Remove a comment post
  removeComment: async (req, res) => {
    const errors = {};
    console.log(req.params);

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      if (!profile) {
        errors.noProfile =
          "User has no profile, Probably not a registered user!";

        return res.status(400).json(errors);
      } else {
        let post = await Post.findById(req.params.id);

        // Check if post exists
        if (!post) {
          errors.noPost = "No such post found";
          return res.status(404).json(errors);
        }

        // Find the comment to remove
        const foundComment = post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        );

        if (foundComment.length === 0) {
          // Comment does not exist
          errors.noComment = "Comment does not exist";
          return res.status(404).json(errors);
        }

        // Get the removeIndex for the comment to be removed
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of the array
        post.comments.splice(removeIndex, 1);

        let postComment = await post.save();
        res.json(postComment);
      }
    } catch (error) {
      console.log(error);
      errors.noProfile = "User has no profile, Probably not a registered user!";
      return res.status(401).json(errors);
    }
  }
};
