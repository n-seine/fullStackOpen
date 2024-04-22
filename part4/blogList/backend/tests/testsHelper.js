const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f5",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17g8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];
const emptyBlogs = [];

const closeConnection = async () => {
  await mongoose.connection.close();
};

const initializeBlogs = async () => {
  await Blog.deleteMany({});
  const user = await User.findOne({ username: "tester" });
  const promiseArray = initialBlogs.map((blog) =>
    new Blog({ ...blog, user }).save()
  );
  await Promise.all(promiseArray);
};

const testUsers = [
  {
    username: "tester",
    name: "Test User",
    password: "tester",
  },
  {
    username: "tester2",
    name: "Test User 2",
    password: "tester2",
  },
];

const initializeUsers = async () => {
  await User.deleteMany({});
  const promiseArray = testUsers.map((user) => new User(user).save());
  await Promise.all(promiseArray);
  console.log("users created");
};
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  initializeBlogs,
  listWithOneBlog,
  emptyBlogs,
  usersInDb,
  initializeUsers,
  testUsers,
  closeConnection,
};
