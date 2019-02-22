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

// @type      GET
// @Route     /api/profile/handle/:handle
// @desc      Get profile by handle
// @access    Public
router.get("/handle/:handle", profileController.getPublicHandle);

// @type      GET
// @Route     /api/profile/user/:user_id
// @desc      Get profile by user ID
// @access    Public
router.get("/user/:user_id", profileController.getUserByID);

// @type      GET
// @Route     /api/profile/all
// @desc      GEt all profiles
// @access    Public
router.get("/all", profileController.getAllProfiles);

// @type      POST
// @Route     /api/profile
// @desc      Create or Edit user profile
// @access    Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.createProfile
);

// @type      POST
// @Route     /api/profile/experience
// @desc      Add experience
// @access    Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileController.addExperience
);

module.exports = router;
