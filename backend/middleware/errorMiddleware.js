function notFound(req, res, next) {
  res.status(404);
  res.json({ success: false, error: { message: `Not Found - ${req.originalUrl}`, code: 'NOT_FOUND' } });
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'Server Error';
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: err.code || undefined,
      // Avoid leaking stack traces in production
      stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    },
  });
}

module.exports = { notFound, errorHandler };
