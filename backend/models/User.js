const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['farmer', 'buyer', 'expert', 'admin'], required: true },
  profile: {
    name: String,
    contact: String,
    address: String,
    bio: String,
    expertise: [String] // For experts
  },
  registration_date: { type: Date, default: Date.now }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
