const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const checkUserAuth = require('../middleware/auth-middleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Directory to store images locally
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Generate a unique file name
    }
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      // Accept image files only
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    }
  }).array('images', 5); // Allow up to 5 photos
  
  // POST route to create a new blog
  router.post('/create', checkUserAuth, (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ error: err.message });
      } else if (err) {
        console.error('Unknown error:', err);
        return res.status(500).json({ error: 'An unknown error occurred' });
      }
  
      try {
        // Check if images were uploaded
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'At least one image is required' });
        }
  
        // Debug: Log user information
        console.log('User from token:', req.user);
  
        if (!req.user || !req.user._id) {
          return res.status(400).json({ error: 'User information is missing or invalid' });
        }
  
        // Create new blog post
        const newBlog = new Blog({
          title: req.body.title,
          content: req.body.content,
          author_id: req.user._id,
          images: req.files.map(file => file.path)
        });
  
        // Debug: Log the newBlog object before saving
        console.log('New blog to be saved:', newBlog);
  
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
  
      } catch (error) {
        console.error('Error creating blog:', error);
        res.status(400).json({ error: 'Error creating blog', details: error.message });
      }
    });
  });

// GET route to retrieve all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author_id', '_id name email');
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error retrieving blogs:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// GET route to retrieve a specific blog by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author_id', '_id name email');
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error retrieving blog:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
