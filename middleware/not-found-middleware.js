const { StatusCodes } = require("http-status-codes");

const notFoundMiddleware = (req, res, next) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "fail",
    message: `No route exists for route: ${req.originalUrl}`,
  });
};

module.exports = notFoundMiddleware;
