// Need to configure custom error handlers
// Determine a method to output the error in formats
// Start simple - make this only send back errors.
// plugin logs at some point as well?

function defaultHandler(err) {
  const code = err.code || 500;
  let status = 'error';
  let error = {data: err.message};
  if (status === 500) {
    status = 'fail';
    error = {message: 'Internal Server Error'};
  }
  // stackTrace(err.stack);
  return { code, status, error };
}

export default function (err, req, res, next) {
  const errorHandler = ErrorHandlers[err.name] || defaultHandler;
  const { code, status, error } = errorHandler(err);
  res.status(code).json({ status, ...error });
}
