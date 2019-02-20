const express = require('express')
const router = express.Router()

const profileController = require('../../controllers/profile')

// Build the routes here

// @Route     /api/users/
// @desc      Get all Users
// @access    Public
router.get('/', profileController.getProfile)

module.exports = router