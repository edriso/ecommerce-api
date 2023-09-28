const Review = require('../models/Review');
const Product = require('../models/Product');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const getAllReviews = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // populate allows us to reference documents in other collection
  const reviews = await Review.find({})
    .populate({
      path: 'product', // product as the field name in Review model
      select: 'name company price', // fields in Product model
    })
    .populate({
      path: 'user',
      select: 'name',
    })
    .skip(skip)
    .limit(limit);

  const totalReviews = await Review.countDocuments({});
  const totalPages = Math.ceil(totalReviews / limit);

  return res.json({
    count: totalReviews,
    reviews,
    currentPage: totalPages ? page : 0,
    totalPages,
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
  const review = await Review.findById(req.params.id);

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${req.params.id}`);
  }

  checkPermissions({
    requestUser: req.user,
    resourceUserId: review.user,
  });

  const { rating, title, comment } = req.body;
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();

  res.json({ review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
  }

  checkPermissions({ requestUser: req.user, resourceUserId: review.user });

  await review.deleteOne();
  res.status(204).json({ msg: 'Success! Review deleted' });
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
