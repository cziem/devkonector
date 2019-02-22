const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../../controllers/users");

// Build the routes here

// @type      GET
// @Route     /api/users/
// @desc      Get all Users
// @access    Public
router.get("/", userController.allUsers);

// @type      POST
// @Route     /api/users/register
// @desc      Register a new user
// @access    Public
router.post("/register", userController.register);

// @type      POST
// @Route     /api/users/login
// @desc      Login a user / Returning a Token
// @access    Public
router.post("/login", userController.login);

// @type      GET
// @Route     /api/users/current
// @desc      Return a current user
// @access    Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  userController.current
);

module.exports = router;
