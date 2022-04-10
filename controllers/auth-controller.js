const { StatusCodes } = require("http-status-codes");

const UserModel = require("../models/user-model");
const { BadRequestError, NotFoundError } = require("../errors");

const register = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new BadRequestError("Password field must not be empty");
  }

  const user = await UserModel.create(req.body);

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ status: "success", data: token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Must provide email and password");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new NotFoundError(`No user with email: ${email}`);
  }

  const isPasswordValid = user.validatePassword(password);

  if (!isPasswordValid) {
    throw new BadRequestError("Invalid password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ status: "success", data: token });
};

module.exports = { register, login };
