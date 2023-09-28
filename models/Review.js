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
      trim: true,
      maxlength: 100,
      required: [true, 'Please provide a title for your review'],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, 'Please provide a comment for your review'],
    },
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

// To make each user can only make 1 review per product, there're two solutions
// 1- by indexing, and 2- from controller
//
// create a compound index on the product and user fields of the Review schema, and
// ensuring that each combination of product and user is unique in the collection
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// .statics are similar to .methods, but the functions here are used by the schema not the instances
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null, // null || '$product' ~ null means we want to group all documents together
        averageRating: {
          $avg: '$rating',
        },
        numberOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  // console.log(result); //[ { _id: null, averageRating: 3.5, numberOfReviews: 2 } ]
  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numberOfReviews: result[0]?.numberOfReviews || 0,
      },
    );
  } catch (error) {
    console.log(
      'Error in calculateAverageRating method in Review model 💥:',
      error,
    );
  }
};

reviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
});
reviewSchema.post(
  'deleteOne',
  { document: true, query: false },
  async function () {
    await this.constructor.calculateAverageRating(this.product);
  },
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
