const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";
  if (process.env.NODE_ENV === "development") {
    sendErrorForDevelop(error, res);
  } else {
    sendErrorForProduction(error, res);
  }
};
const sendErrorForDevelop = (error, res) => {
  return res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
    error,
    stack: error.stack,
  });
};
const sendErrorForProduction = (error, res) => {
  return res.status(error.statusCode).json({
    success: false,
    status: error.status,
    message: error.message,
  });
};
export default globalError;
