const { StatusCodes } = require("http-status-codes");

const { CustomApiError } = require("../errors");

const VALIDATION_ERROR = "ValidationError";
const DUPLICATE_KEY_ERROR = 11000;

const errorHandlingMiddlware = (err, req, res, next) => {
  console.log(err.stack);

  const customError = {
    status: "fail",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something unexpected happened, please try again later",
  };

  if (err instanceof CustomApiError) {
    customError.message = err.message;
  }

  if (err.name === VALIDATION_ERROR) {
    customError.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  if (err.code === DUPLICATE_KEY_ERROR) {
    customError.message = `User already exists with email: ${err.keyValue.email}`;
  }

  res
    .status(customError.statusCode)
    .json({ status: customError.status, message: customError.message });
};

module.exports = errorHandlingMiddlware;
