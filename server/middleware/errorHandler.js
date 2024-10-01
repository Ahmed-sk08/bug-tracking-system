// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log the error stack trace for debugging
  
    const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
    res.status(statusCode).json({
      status: 'error',
      message: err.message || 'Internal Server Error',
    });
  }
  
  module.exports = errorHandler;
  