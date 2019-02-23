const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../../controllers/posts");

// Build the routes here

// @type      GET
// @Route     /api/posts/
// @desc      Get all posts
// @access    Public
router.get("/", postController.getPosts);

// @type      GET
// @Route     /api/posts/:id
// @desc      Get all posts
// @access    Public
router.get("/:id", postController.getPost);

// @type      POST
// @Route     /api/posts/
// @desc      Create a new post
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

// @type      POST
// @Route     /api/posts/like/:id
// @desc      Like a post
// @access    Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  postController.like
);

// @type      POST
// @Route     /api/posts/unllike/:id
// @desc      Unlike a post
// @access    Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  postController.unlike
);

// @type      POST
// @Route     /api/posts/comment/:id
// @desc      Add comment to a post
// @access    Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  postController.addComment
);

// @type      DELETE
// @Route     /api/posts/comment/:id
// @desc      Remove comment from a post
// @access    Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  postController.removeComment
);

// @type      DELETE
// @Route     /api/posts/:id
// @desc      Delete a post
// @access    Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = router;
