const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
  const statuCode = err.statuCode || 500;
  const message = err.message || "Internal Server Error ";

  // mongodb dulicate error
  if (err.name === 11000) {
    const message = ` Duplicte ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(400, message);
  }

  // mongodb cast error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid :${err.path}`;
    err = new ErrorHandler(400, message);
  }

  // chech error instance
  if (err instanceof ErrorHandler) {
    return res.status(statuCode).json({
      success: false,
      message,
      // error: err.stack,
    });
  }

  return res.status(statuCode).json({
    success: false,
    message,
    error: err,
  });
};

module.exports = ErrorMiddleware;
