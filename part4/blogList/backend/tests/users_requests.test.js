const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const testHelper = require("./testsHelper");

beforeEach(async () => {
  await testHelper.initializeUsers();
});

const api = supertest(app);
describe("users are correctly created", () => {
  test("POST /api/users increases users number by 1", async () => {
    const initialLength = testHelper.testUsers.length;
    const newUser = {
      username: "newUser",
      name: "New User",
      password: "newUser",
    };
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const usersInDb = await testHelper.usersInDb();
    assert.strictEqual(usersInDb.length, initialLength + 1);
  });

  test("username and password are required", async () => {
    const newUser = {
      name: "New User",
    };
    await api.post("/api/users").send(newUser).expect(400);
    const usersInDb = await testHelper.usersInDb();
    assert.strictEqual(usersInDb.length, testHelper.testUsers.length);
  });

  test("username must be unique", async () => {
    const newUser = {
      username: "tester",
      name: "Test User",
      password: "tester",
    };
    const response = await api.post("/api/users").send(newUser).expect(400);
    console.log("response", response);
    const usersInDb = await testHelper.usersInDb();
    assert.strictEqual(usersInDb.length, testHelper.testUsers.length);
    assert(response.text.includes("username"));
  });

  test("password must be at least 3 characters long", async () => {
    const newUser = {
      username: "newUser",
      name: "New User",
      password: "a",
    };
    const response = await api.post("/api/users").send(newUser).expect(400);
    const usersInDb = await testHelper.usersInDb();
    assert.strictEqual(usersInDb.length, testHelper.testUsers.length);
    assert(response.text.includes("password"));
  });

  test("username must be at least 3 characters long", async () => {
    const newUser = {
      username: "a",
      name: "New User",
      password: "newUser",
    };
    const response = await api.post("/api/users").send(newUser).expect(400);
    const usersInDb = await testHelper.usersInDb();
    assert.strictEqual(usersInDb.length, testHelper.testUsers.length);
    assert(response.text.includes("username"));
  });
});

after(async () => testHelper.closeConnection());
