const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  farmer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  crop_name: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  quality_description: { 
    type: String 
  },
  starting_price: { 
    type: Number, 
    required: true 
  },
  images: { 
    type: [String] 
  },
  auction_details: {
    start_time: { 
      type: Date, 
      required: true 
    },
    end_time: { 
      type: Date, 
      required: true 
    },
    reserve_price: { 
      type: Number 
    },
    highest_bid: { 
      type: Number, 
      default: 0 
    },
    highest_bidder_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      default: null 
    }
  },
  status: { 
    type: String, 
    enum: ['active', 'completed'], 
    default: 'active' 
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware to update the `updated_at` field before each save
cropSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;
