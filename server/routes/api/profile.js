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
// @desc      Add experience to profile
// @access    Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  profileController.addExperience
);

// @type      POST
// @Route     /api/profile/education
// @desc      Add education to profile
// @access    Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  profileController.addEducation
);

// @type      DELETE
// @Route     /api/profile/experience/:id
// @desc      Remove experience from profile
// @access    Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteExperience
);

// @type      DELETE
// @Route     /api/profile/education/:id
// @desc      Remove education from profile
// @access    Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteEducation
);

// @type      DELETE
// @Route     /api/profile
// @desc      Remove profile
// @access    Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  profileController.deleteProfile
);

module.exports = router;
