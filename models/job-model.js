const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ["applied", "interviewing", "declined", "offer"],
      message: "Status must be either: applied interviewing declined offer",
    },
    default: "applied",
  },
  company: {
    type: String,
    required: [true, "Company field must not be emtpy"],
    minlength: 4,
  },
  position: {
    type: String,
    required: [true, "Position field must not be empty"],
    minlength: 4,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "User ID field must not be empty"],
  },
});

module.exports = mongoose.model("Job", JobSchema);
