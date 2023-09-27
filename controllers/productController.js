const path = require('path');
const Product = require('../models/Product');
const Review = require('../models/Review');
const CustomError = require('../errors');

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json({ count: products.length, products });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('reviews');
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`);
  }
  res.json({ product });
};

const getSingleProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });
  res.json({ count: reviews.length, reviews });
};

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      runValidators: true,
      new: true,
    },
  );
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`);
  }
  res.json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`);
  }
  await product.deleteOne();
  res.status(204).json({ msg: 'Success! Product removed.' });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded.');
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload an image.');
  }

  const maxSize = 1024 * 1024 * 1;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload an image with maximum size of 1 MB.',
    );
  }

  const imageName = new Date().valueOf() + '-' + productImage.name;
  const imagePath = path.join(__dirname, `../public/uploads/${imageName}`);

  await productImage.mv(imagePath);

  res.json({ img: `/uploads/${imageName}` });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  getSingleProductReviews,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
