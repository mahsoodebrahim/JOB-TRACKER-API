const jwt = require("jsonwebtoken");

const { BadRequestError } = require("../errors");

const authorizationMiddleware = (req, res, next) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
    throw new BadRequestError("Invalid Authorization Header");
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { name: decoded.name, userId: decoded.userId };
    next();
  } catch (error) {
    throw new BadRequestError("Invalid Authorization");
  }
};

module.exports = authorizationMiddleware;
