const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});

test("Environment is correct", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("[POST] /api/auth/login", () => {
  const user = { username: "Logan", password: "Pas2" };

  test("Checks for an existing user", async () => {
    await request(server).post("/api/auth/register").send(user);
    const res = await request(server).post("/api/auth/login").send(user);
    expect(res.status).toBe(200);
  });
});

describe("[POST] /api/auth/register", () => {
  const user = { username: "Caden", password: "Pass" };
  const incompleteUser = { username: "josh" };
  test("Creates User", async () => {
    const res = await request(server).post("/api/auth/register").send(user);
    expect(res.status).toBe(201);
  });
  test("throws a 401 in case of incomplete credentials", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send(incompleteUser);
    expect(res.status).toBe(401);
  });
});
