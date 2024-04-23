const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const testHelper = require("./testsHelper");

const api = supertest(app);

beforeEach(async () => {
  await testHelper.initializeUsers();
});

describe("users are correctly created", () => {
  test("POST /api/users increases users number by 1", async () => {
    console.log("users in db at the start", await testHelper.usersInDb());

    const initialLength = testHelper.testUsers.length + 1;
    const newUser = {
      username: "newUser",
      name: "New User",
      password: "newUser",
    };

    console.log("users in db now", await testHelper.usersInDb());
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    const usersInDb = await testHelper.usersInDb();
    console.log(usersInDb);
    assert.strictEqual(usersInDb.length, initialLength + 1);
  });

  test("username and password are required", async () => {
    const newUser = {
      name: "New User",
    };
    const initialLength = testHelper.testUsers.length + 1;

    await api.post("/api/users").send(newUser).expect(400);
    const usersInDb = await testHelper.usersInDb();
    assert.strictEqual(usersInDb.length, initialLength);
  });

  test("username must be unique", async () => {
    const newUser = {
      username: "tester",
      name: "Test User",
      password: "tester",
    };
    const response = await api.post("/api/users").send(newUser).expect(400);
    const usersInDb = await testHelper.usersInDb();
    console.log("unique username users", usersInDb);

    assert.strictEqual(usersInDb.length, testHelper.testUsers.length);
    assert(response.text.includes("username"));
  });

  test("password must be at least 3 characters long", async () => {
    const newUser = {
      username: "newUser",
      name: "New User",
      password: "a",
    };
    const initialLength = testHelper.testUsers.length + 1;

    const response = await api.post("/api/users").send(newUser).expect(400);
    const usersInDb = await testHelper.usersInDb();
    console.log("password length users", usersInDb);
    assert.strictEqual(usersInDb.length, initialLength);
    assert(response.text.includes("password"));
  });

  test("username must be at least 3 characters long", async () => {
    const newUser = {
      username: "a",
      name: "New User",
      password: "newUser",
    };
    const initialLength = testHelper.testUsers.length + 1;

    const response = await api.post("/api/users").send(newUser).expect(400);
    const usersInDb = await testHelper.usersInDb();
    assert.strictEqual(usersInDb.length, initialLength);
    assert(response.text.includes("username"));
  });
});

after(async () => {
  User.deleteMany({});
  testHelper.closeConnection();
});
