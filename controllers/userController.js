const User = require('../models/user');
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
  // const users = await User.find({})
  res.send('getAllUsers');
};

const getSingleUser = async (req, res) => {
  res.send('getSingleUser');
};

const showCurrentUser = async (req, res) => {
  res.send('showCurrentUser');
};

const updateUser = async (req, res) => {
  res.send('updateUser');
};

const updateUserPassword = async (req, res) => {
  res.send('updateUserPassword');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
