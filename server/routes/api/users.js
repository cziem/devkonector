const express = require('express')
const router = express.Router()

const userController = require('../../controllers/users')

// Build the routes here

// @Route     /api/users/
// @desc      Get all Users
// @access    Public
router.get('/', userController.allUsers)

// @Route     /api/users/register
// @desc      Register a new user
// @access    Public
router.post('/register', userController.register)

module.exports = router