const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();
const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.replace("Bearer ", "");
  }
  return next();
};

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
  } else {
  }
  return next();
};

module.exports = { tokenExtractor, userExtractor };
