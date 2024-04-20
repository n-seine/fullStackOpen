require("dotenv").config();
const PORT = process.env.PORT;
const mongoUrl =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_TEST_URL
    : process.env.MONGO_PROD_URL;
module.exports = { PORT, mongoUrl };
