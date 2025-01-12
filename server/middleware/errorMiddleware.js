const notFound = (req, res, next) => {
  const error = new Error(`Not found the ${req.originalUrl} page`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message;

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 401;
    message = 'Invalid ObjectId';
  }

  res.status(statusCode).json({
    status: statusCode,
    message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
};

export { notFound, errorHandler };
