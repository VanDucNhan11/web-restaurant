const Post = require('../models/Post.model'); // Import model
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const postController = {
  getAllPosts: async (req, res, next) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  },

  createPost: async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      try {
        const { title, content, datePosted } = req.body;
        const image = req.file ? req.file.path : 'uploads/default.png'; // Default image if none uploaded
        const newPost = new Post({ title, content, datePosted, image });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
      } catch (error) {
        next(error);
      }
    });
  },

  updatePost: async (req, res, next) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        return next(err);
      }
      try {
        const { id } = req.params;
        const { title, content, datePosted } = req.body;
        const image = req.file ? req.file.path : req.body.image;
        const updatedPost = await Post.findByIdAndUpdate(
          id,
          { title, content, datePosted, image },
          { new: true }
        );
        res.json(updatedPost);
      } catch (error) {
        next(error);
      }
    });
  },

  deletePost: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
  getPostById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = postController;
