const Product = require('../models/Product');
const CustomError = require('../errors');

const getAllProducts = async (req, res) => {
  res.send('getAllProducts');
};

const getSingleProduct = async (req, res) => {
  res.send('getSingleProduct');
};

const createProduct = async (req, res) => {
  res.status(201).send('createProduct');
};

const updateProduct = async (req, res) => {
  res.send('updateProduct');
};

const deleteProduct = async (req, res) => {
  res.status(204).send('deleteProduct');
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
