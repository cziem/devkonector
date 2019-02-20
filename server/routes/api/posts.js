const express = require('express')
const router = express.Router()

const postController = require('../../controllers/posts')

// Build the routes here

// @Route     /api/posts/
// @desc      Get all posts
// @access    Private
router.get('/', postController.allPosts)

module.exports = router