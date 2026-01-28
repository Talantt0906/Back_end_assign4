const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewText: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  song: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Song', 
      required: true 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);