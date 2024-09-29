const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// POST route to create a new comment for a blog
router.post('/', async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(400).json({ error: 'Error adding comment' });
  }
});

// GET route to fetch comments for a specific blog
router.get('/blog/:blog_id', async (req, res) => {
  try {
    const comments = await Comment.find({ blog_id: req.params.blog_id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
});

module.exports = router;
