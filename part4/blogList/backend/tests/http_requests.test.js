const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const testHelper = require("./testsHelper");

beforeEach(async () => testHelper.initializeBlogs());

const api = supertest(app);
describe("HTTP requests are handled properly", () => {
  test("GET /api/blogs returns JSON", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("identifier of blogs is a string property named id", async () => {
    const response = await api.get("/api/blogs");
    const listOfIds = response.body.map((b) => b.id);
    assert(listOfIds.every((id) => typeof id === "string"));
  });

  test("a new blog can be added", async () => {
    const initialLength = testHelper.initialBlogs.length;
    const newBlog = {
      title: "A newly added blog",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };
    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    const body = response.body;
    assert.strictEqual(body.length, initialLength + 1);
    const addedBlog = body.find((blog) => blog.title === newBlog.title);
    assert.deepStrictEqual(addedBlog.author, newBlog.author);
    assert.deepStrictEqual(addedBlog.likes, newBlog.likes);
  });

  test("blog 'likes' default to 0", async () => {
    const blogWithoutLikes = {
      title: "A blog without name",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      author: "Edsger W. Dijkstra",
    };
    await api.post("/api/blogs").send(blogWithoutLikes).expect(201);
    const response = await api.get("/api/blogs");
    const addedBlog = response.body.find(
      (blog) => blog.title === blogWithoutLikes.title
    );
    assert.strictEqual(addedBlog.likes, 0);
  });

  test("returns 400 if URL is missing", async () => {
    const blogWithoutURL = {
      title: "A blog without URL",
      author: "Edsger W. Dijkstra",
    };
    await api.post("/api/blogs").send(blogWithoutURL).expect(400);
  });

  test("returns 400 if title is missing", async () => {
    const blogWithoutTitle = {
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      author: "Edsger W. Dijkstra",
    };
    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
  });
});

after(async () => await mongoose.connection.close());
