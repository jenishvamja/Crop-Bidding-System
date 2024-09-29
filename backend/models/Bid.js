const mongoose = require('mongoose');
const { Schema } = mongoose;

const bidSchema = new Schema({
  _id: { type: String, required: true }, // unique_bid_id
  crop_id: { type: String, required: true, ref: 'Crop' }, // Refers to the crop being bid on
  bidder_id: { type: String, required: true, ref: 'User' }, // Refers to the user placing the bid
  bid_amount: { type: Number, required: true }, // Amount of the bid
  bid_date: { type: Date, default: Date.now }, // Date the bid was placed
});

// Create and export the Bid model
module.exports = mongoose.model('Bid', bidSchema);
