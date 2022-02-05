const connectDB = require("./src/db/connect");
const { app, setRateLimiter } = require("./src/app");
const CustomError = require("./src/errors");
const errorHandlerMiddleware = require("./src/middleware/error-handler");
const notFoundMiddleware = require("./src/middleware/not-found");
const { isTokenValid } = require("./src/utils/jwt");

module.exports = {
  connectDB,
  app,
  setRateLimiter,
  CustomError,
  errorHandlerMiddleware,
  notFoundMiddleware,
  isTokenValid,
};
