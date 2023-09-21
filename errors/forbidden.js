const CustomAPIError = require('./custom-api');

class ForbiddenError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
