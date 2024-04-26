const Blog = require("../models/blog");
const User = require("../models/user");
const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
blogRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogRouter.post("/", async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: "token missing or invalid" });
    } else {
      const user = request.user;
      const blog = new Blog({
        ...request.body,
        user: user._id,
      });
      const savedBlog = await blog.save();
      response.status(201).json(savedBlog);
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;
    if (!request.user) {
      return response.status(401).json({ error: "token missing or invalid" });
    } else {
      const blogToDelete = await Blog.findById(request.params.id);
      if (!blogToDelete) {
        return response.status(404).json({ error: "Blog not found" });
      }
      if (blogToDelete.user.toString() === user.id) {
        await Blog.findByIdAndDelete(request.params.id);
        response
          .status(204)
          .json({ message: "Success ! Blog has been deleted" })
          .end();
      } else {
        response.status(401).json({
          error: "unauthorized deletion : you are not the creator of this blog",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {

blogRouter.put("/:id", async (request, response, next) => {
  try {
    const updatedBlog = request.body;

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
    response.status(200).end();
  } catch (error) {
    next(error);
  }
});
  try {
    const updatedBlog = request.body;

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true });
    response.status(200).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
