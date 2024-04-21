const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const errorHandler = require("./utils/errorHandler");
const blogRouter = require("./controllers/blogs");

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
app.use("/api/blogs", blogRouter);
app.use(errorHandler);

module.exports = app;
