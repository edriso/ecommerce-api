const User = require('../models/user');
const CustomError = require('../errors');
const { attachCookiesToResponse } = require('../utils');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new CustomError.BadRequestError('Email already in use');
  }

  //   // Register first user as an admin
  //   const isFirstAccount = (await User.countDocuments({})) === 0;
  //   const role = isFirstAccount ? 'admin' : 'user';

  const user = await User.create({ name, email, password });

  const tokenUser = { name: user.name, userId: user.id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Missing Email or password');
  }

  const user = await User.find({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  if (!user.checkPassword(password)) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  const tokenUser = { name: user.name, userId: user.id, role: user.role };
  attachCookiesToResponse({ res, user: tokenUser });

  res.json({ user: tokenUser });
};

const logout = async (req, res) => {
  console.log(req.signedCookies);
  const users = await User.deleteMany({});
  res.json({ users });
};

module.exports = {
  register,
  login,
  logout,
};
