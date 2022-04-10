require("dotenv").config();
require("express-async-errors");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const cors = require("cors");
const express = require("express");

const jobsRouter = require("./routes/jobs-routes");
const authRouter = require("./routes/auth-routes");
const connectDB = require("./database/connect-db");
const errorHandlingMiddlware = require("./middleware/error-handling-middleware");
const notFoundMiddleware = require("./middleware/not-found-middleware");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware
app.set("trust proxy", 1);
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("JOBS API");
});

// Routes
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/auth", authRouter);
app.use(notFoundMiddleware);

// Error Handling
app.use(errorHandlingMiddlware);

const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to database!");

    const port = 3000;
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
