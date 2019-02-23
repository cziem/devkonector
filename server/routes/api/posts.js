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
// @desc      like a post
// @access    Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  postController.like
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
