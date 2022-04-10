const express = require("express");

const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobs-controller");
const authorizationMiddleware = require("../middleware/authorization-middleware");

const router = express.Router();

router.use(authorizationMiddleware);

router.route("/").get(getJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
