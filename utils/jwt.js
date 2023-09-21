const jwt = require('jsonwebtoken');

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME || '1d',
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay), // 1 day to match the token expiration
    secure: process.env.NODE_ENV === 'production', // if true, send the cookie with https only
    signed: true, // if true, it makes the cookie signed, it can detect if client modified the cookie
  });
};

module.exports = { createJWT, isTokenValid, attachCookiesToResponse };
