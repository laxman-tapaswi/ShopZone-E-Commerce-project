const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
  const statuCode = err.statuCode || 500;
  const message = err.message || "Internal Server Error ";

  // chech error instance
  if (err instanceof ErrorHandler) {
    return res.status(statuCode).json({
      success: false,
      message,
    });
  }

  return res.status(statuCode).json({
    success: false,
    message,
    error: err,
  });
};

module.exports = ErrorMiddleware;
