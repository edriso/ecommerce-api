const Product = require('../models/Product');
const CustomError = require('../errors');

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json({ totalCount: products.length, products });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`);
  }
  res.json({ product });
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
  res.send('uploadImage');
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
