const Order = require('../models/Order');
const CustomError = require('../errors');

const getAllOrders = async (req, res) => {
  res.send('getAllOrder');
};

const getSingleOrder = async (req, res) => {
  res.send('getSingleOrder');
};

const getCurrentUserOrders = async (req, res) => {
  res.send('getCurrentUserOrders');
};

const createOrder = async (req, res) => {
  res.send('createOrder');
};

const updateOrder = async (req, res) => {
  res.send('updateOrder');
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};
