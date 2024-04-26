const User = require("../models/user");
const userRouter = require("express").Router();

const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response, next) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });
  response.json(users);
});

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;
    console.log(username, name, password);
    if (!password || password.length < 3) {
      return response
        .status(400)
        .json({ error: "password must be at least 3 characters long" });
    }
    const saltRounds = 2;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const createdUser = new User({
      username,
      name,
      password: passwordHash,
    });
    const savedUser = await createdUser.save();
    return response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
