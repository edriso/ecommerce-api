const Review = require('../models/Review');
const Product = require('../models/Product');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const getAllReviews = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({}).skip(skip).limit(limit);

  const totalReviews = await Review.countDocuments({});
  const numberOfPages = Math.ceil(totalReviews / limit);

  res.json({
    currentPage: page,
    numberOfPages,
    allReviewsCount: totalReviews,
    reviews,
  });
};

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const { userId } = req.user;
  const isValidProduct = await Product.findById(productId);
  if (!isValidProduct) {
    throw new CustomError.BadRequestError(`No product with id: ${productId}`);
  }

  const isAlreadySubmitted = await Review.findOne({
    product: productId,
    user: userId,
  });

  if (isAlreadySubmitted) {
    throw new CustomError.BadRequestError(
      'Already submitted a review for this product',
    );
  }

  req.body.user = userId;

  const review = await Review.create(req.body);

  res.status(201).json({ review });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
  }
  res.json({ review });
};

const updateReview = async (req, res) => {
  res.send('updateReview');
};

const deleteReview = async (req, res) => {
  res.status(204).send('deleteReview');
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
