const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError('Invalid authentication');
  }

  try {
    const payload = isTokenValid({ token });
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Invalid authentication');
  }
};

const authorizePermissions = (...authorizedRoles) => {
  // when adding authorizePermissions middleware, we write it like this authorizePermissions('admin', 'owner')
  // but this call the function immediately
  // that's why we must return a function to reference to it
  return (req, res, next) => {
    if (!authorizedRoles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route',
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
