const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// POST a new post
router.post('/', postController.createPost);

// PUT update a post
router.put('/:id', postController.updatePost);

// DELETE a post
router.delete('/:id', postController.deletePost);

// GET all posts
router.get('/', postController.getAllPosts);

module.exports = router;
