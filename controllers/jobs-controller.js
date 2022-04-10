const { StatusCodes } = require("http-status-codes");

const { NotFoundError } = require("../errors");

const JobModel = require("../models/job-model");

const getJobs = async (req, res) => {
  const { userId } = req.user;

  const jobs = await JobModel.find({ userId });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", length: jobs.length, data: jobs });
};

const getJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const job = await JobModel.findOne({ userId, _id: jobId });

  if (!job) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ status: "success", data: job });
};

const createJob = async (req, res) => {
  const { userId, name } = req.user;

  const job = await JobModel.create({ ...req.body, name, userId });

  res.status(StatusCodes.CREATED).json({ status: "success", data: job });
};

const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const updatedJob = await JobModel.findOneAndUpdate(
    { userId, _id: jobId },
    req.body,
    { runValidators: true, new: true }
  );

  if (!updatedJob) {
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ status: "success", data: updatedJob });
};

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { userId } = req.user;

  const deletedJob = await JobModel.findOneAndDelete({ userId, _id: jobId });

  res
    .status(StatusCodes.OK)
    .send({ status: "success", deletedData: deletedJob });
};

module.exports = { getJobs, getJob, createJob, updateJob, deleteJob };
