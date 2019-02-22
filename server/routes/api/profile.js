const express = require("express");
const router = express.Router();
const passport = require("passport");

const profileController = require("../../controllers/profile");

// Build the routes here

// @type      GET
// @Route     /api/profile
// @desc      Get current users' profile
// @access    Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.getProfile
);

// @type      POST
// @Route     /api/profile
// @desc      Create or Edit user profile
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.createProfile
);

module.exports = router;
