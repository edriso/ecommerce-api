const Order = require('../models/Order');
const CustomError = require('../errors');

const createOrder = async (req, res) => {
  res.status(201).json('createOrder');
};

const getAllOrders = async (req, res) => {
  res.json('getAllOrder');
};

const getSingleOrder = async (req, res) => {
  res.json('getSingleOrder');
};

const getCurrentUserOrders = async (req, res) => {
  res.json('getCurrentUserOrders');
};

const updateOrder = async (req, res) => {
  res.json('updateOrder');
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  updateOrder,
};
