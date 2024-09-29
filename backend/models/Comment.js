const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  _id: { type: String, required: true }, // unique_comment_id
  blog_id: { type: String, required: true, ref: 'Blog' }, // Refers to the blog that the comment belongs to
  author_id: { type: String, required: true, ref: 'User' }, // Refers to the user who authored the comment
  content: { type: String, required: true }, // Content of the comment
  created_at: { type: Date, default: Date.now } // Date when the comment was created
});

// Create and export the Comment model
module.exports = mongoose.model('Comment', commentSchema);
