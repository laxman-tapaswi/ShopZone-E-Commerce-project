class ErrorHandler extends Error {
  constructor(
    statuCode,
    message = "something Wrong",
    errors = [],
    statck = ""
  ) {
    this.statusCode = statuCode;
    this.message = message;
    this.errors = errors;
    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
module.exports = ErrorHandler;
