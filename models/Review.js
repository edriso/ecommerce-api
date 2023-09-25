const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      maxlength: 100,
      required: [true, 'Please provide a title for your review'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide a comment for your review'],
    },
    // To make each user can only make 1 review per product, there're two solutions
    // 1- by indexing, and 2- from controller
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must be related to a user'],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must be related to a product'],
    },
  },
  { timestamps: true },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
