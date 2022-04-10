const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Please provide an email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 4,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { name: this.name, userId: this._id },
    process.env.JWT_SECRET
  );
};

UserSchema.methods.validatePassword = function (providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
