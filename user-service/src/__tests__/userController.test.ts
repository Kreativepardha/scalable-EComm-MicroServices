import mongoose from "mongoose";
import { MONGO_URI } from "..";
import request from "supertest";

describe("User API", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_URI as string);
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should register a new user", async () => {
    const res = await request(app).post("/users/register").send({
      name: "test user",
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should login an existing user", async () => {
    const res = await request(app).post("/users/login").send({
      email: "test@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
  it("should fetch a user by email", async () => {
    const res = await request(app).get("/users/email/test2@example.com");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", "test2@example.com");
  });

  it("should update a user", async () => {
    const newUser = await request(app).post("/users/register").send({
      name: "Test User3",
      email: "test3@example.com",
      password: "password123",
    });

    const res = await request(app)
      .put(`/users/${newUser.body._id}`)
      .send({ name: "Updated User" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "Updated User");
  });

  it("should delete a user", async () => {
    const newUser = await request(app).post("/users/register").send({
      name: "Test User4",
      email: "test4@example.com",
      password: "password123",
    });

    const res = await request(app).delete(`/users/${newUser.body._id}`);
    expect(res.statusCode).toEqual(204);
  });
});
