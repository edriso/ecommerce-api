const User = require('../models/user');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

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

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(201).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError('Missing Email or password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  if (!(await user.checkPassword(password))) {
    throw new CustomError.UnauthenticatedError('Invalid credentials');
  }

  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.json({ msg: 'Logged out!' });
};

module.exports = {
  register,
  login,
  logout,
};
