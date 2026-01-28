const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body); 
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('song');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};