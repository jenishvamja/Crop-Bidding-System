const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
  _id: { type: String, required: true }, // unique_answer_id
  question_id: { type: String, required: true, ref: 'Question' }, // Refers to the question that the answer is for
  expert_id: { type: String, required: true, ref: 'User' }, // Refers to the expert who answered the question
  content: { type: String, required: true }, // Content of the answer
  created_at: { type: Date, default: Date.now } // Date when the answer was created
});

// Create and export the Answer model
module.exports = mongoose.model('Answer', answerSchema);
