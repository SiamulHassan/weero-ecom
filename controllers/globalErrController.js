const captureErrGlobally = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // developement err
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stackTrace: err.stack,
  });
};
module.exports = captureErrGlobally;
