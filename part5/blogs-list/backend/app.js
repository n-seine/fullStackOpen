const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");
const { userExtractor, tokenExtractor } = require("./utils/jwt");

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(tokenExtractor);
app.use(userExtractor);
app.use("/api/login", loginRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}
app.use(errorHandler);

module.exports = app;
