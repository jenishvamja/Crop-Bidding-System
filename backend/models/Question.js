const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  _id: { type: String, required: true }, // unique_question_id
  farmer_id: { type: String, required: true, ref: 'User' }, // Refers to the farmer who asked the question
  title: { type: String, required: true }, // Title of the question
  content: { type: String, required: true }, // Content of the question
  created_at: { type: Date, default: Date.now }, // Date when the question was created
  updated_at: { type: Date } // Date when the question was last updated
});

// Create and export the Question model
module.exports = mongoose.model('Question', questionSchema);
