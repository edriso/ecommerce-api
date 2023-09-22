const Product = require('../models/Product');
const CustomError = require('../errors');

const getAllProducts = async (req, res) => {
  res.send('getAllProducts');
};

module.exports = {
  getAllProducts,
};
