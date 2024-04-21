const listHelper = require("../utils/list_helper");
const testHelper = require("./testsHelper");
const emptyBlogs = testHelper.emptyBlogs;
const listWithOneBlog = testHelper.listWithOneBlog;
const blogs = testHelper.initialBlogs;

const { test, describe } = require("node:test");
const assert = require("node:assert");

test("dummy returns one", () => {
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("When list is empty, total likes is zero", () => {
    const result = listHelper.totalLikes(emptyBlogs);
    assert.strictEqual(result, 0);
  });

  test("When list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("total like of several blogs is correct", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 24);
  });
});

describe("favorite blog", () => {
  test("blogs list is empty", () => {
    const result = listHelper.favoriteBlog(emptyBlogs);
    assert.strictEqual(result, "no blogs");
  });

  test("blogs list has only one blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    assert.deepStrictEqual(result, {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("blogs list has several blogs", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.deepStrictEqual(result, {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});

describe("most blogs", () => {
  test("blogs list is empty", () => {
    const result = listHelper.mostBlogs(emptyBlogs);
    assert.strictEqual(result, "no blogs");
  });

  test("blogs list has only one blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });
  test("blogs list has several blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      blogs: 2,
    });
  });
});

describe("most likes", () => {
  test("blogs list is empty", () => {
    const result = listHelper.mostLikes(emptyBlogs);
    assert.strictEqual(result, "no blogs");
  });

  test("blogs list has only one blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("blogs list has several blogs", () => {
    const result = listHelper.mostLikes(blogs);
    assert.deepStrictEqual(result, {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
