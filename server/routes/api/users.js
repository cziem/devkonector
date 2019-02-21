const express = require("express");
const router = express.Router();

const userController = require("../../controllers/users");

// Build the routes here

// @Route     /api/users/
// @desc      Get all Users
// @access    Public
router.get("/", userController.allUsers);

// @Route     /api/users/register
// @desc      Register a new user
// @access    Public
router.post("/register", userController.register);

// @Route     /api/users/login
// @desc      Login a user / Returning a Token
// @access    Public
router.post("/login", userController.login);

module.exports = router;
