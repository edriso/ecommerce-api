const Review = require('../models/Review');
const Product = require('../models/Product');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const getAllReviews = async (req, res) => {
  res.send('getAllReviews');
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
  res.send('getSingleReview');
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
