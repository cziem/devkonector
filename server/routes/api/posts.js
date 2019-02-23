const express = require("express");
const router = express.Router();
const passport = require("passport");

const postController = require("../../controllers/posts");

// Build the routes here

// @type      POST
// @Route     /api/posts/
// @desc      Create a new post
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

module.exports = router;
