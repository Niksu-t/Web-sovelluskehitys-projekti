import {validationResult} from 'express-validator';

// Function in case of invalid request to a handler that does not exist
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);

  error.status = 404;
  next(error);
};

// Validation error handler
const validationErrorHandler = (req, res, next) => {
  // Assigns errors from validation result to a variable
  const errors = validationResult(req, {strictParams: ['body']});
  // checks if there are no errors
  if (!errors.isEmpty()) {
    const error = new Error('Bad request', 400);
    error.status = 400;
    error.errors = errors.array({onlyFirstError: true}).map((error) => {
      return {field: error.path, message: error.msg};
    });
    return next(error);
  }
  next();
};
// Error handler
const errorHandler = (err, req, res, next) => {
  // In case of error sends response to client
  res.status(err.status || 500);
  res.json({
    message: err.message,
    status: err.status || 500,
    errors: err.errors,
  });
  next();
};

export {notFoundHandler, errorHandler, validationErrorHandler};
