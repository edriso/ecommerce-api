const CustomAPIError = require('./custom-api');

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
