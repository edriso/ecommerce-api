const User = require('../models/user');
const CustomError = require('../errors');

const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.json({ totalUsers: users.length, users });
};

const getSingleUser = async (req, res) => {
  const { id: userId } = req.params.id;
  const user = await User.findOneById(userId).select('-password');
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }
  res.json({ user });
};

const showCurrentUser = async (req, res) => {
  res.json({ user: req.user });
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
