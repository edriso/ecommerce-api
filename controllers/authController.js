const User = require('../models/user');
const CustomError = require('../errors');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailExists = await User.find({ email });
  if (emailExists) {
    throw new CustomError.BadRequestError('Email already in use');
  }

  //   // Register first user as an admin
  //   const isFirstAccount = (await User.countDocuments({})) === 0;
  //   const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password });
  res.status(201).json({ user });
};

const login = async (req, res) => {
  res.send('login');
};

const logout = async (req, res) => {
  res.send('logout');
};

module.exports = {
  register,
  login,
  logout,
};
