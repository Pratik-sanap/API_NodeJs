const isProd = process.env.NODE_ENV === 'production';

module.exports = (err, req, res, next) => {
  // Log error details (stack only in non-production)
  if (!isProd) {
    console.error(err.stack);
  } else {
    console.error(`[${new Date().toISOString()}]`, err.message);
  }

  let status = err.status || 500;
  let errorMsg = 'Internal Server Error';

  // Validation errors
  if (err.name === 'ValidationError') {
    status = 422;
    errorMsg = err.message;
  }
  // Mongoose bad ObjectId
  else if (err.name === 'CastError') {
    status = 400;
    errorMsg = 'Invalid ID format';
  }
  // JWT errors
  else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    status = 401;
    errorMsg = 'Invalid or expired token';
  }
  // Custom error message
  else if (err.message && status !== 500) {
    errorMsg = err.message;
  }

  // Never leak stack traces in production
  const response = {
    success: false,
    data: null,
    error: errorMsg
  };
  res.status(status).json(response);
};
