const request = require("supertest");
const express = require("express");
const { sequelize } = require("../models");
const routes = require("../routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

describe("Auth Endpoints", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("POST /api/auth/register", () => {
    test("Should register a new user", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          mail: "test@example.com",
          contrasena: "password123"
        });

      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.mail).toBe("test@example.com");
    });

    test("Should not register user with invalid email", async () => {
      const response = await request(app)
        .post("/api/auth/register")
        .send({
          mail: "invalid-email",
          contrasena: "password123"
        });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      await request(app)
        .post("/api/auth/register")
        .send({
          mail: "login@example.com",
          contrasena: "password123"
        });
    });

    test("Should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          mail: "login@example.com",
          contrasena: "password123"
        });

      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });

    test("Should not login with invalid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/login")
        .send({
          mail: "login@example.com",
          contrasena: "wrongpassword"
        });

      expect(response.status).toBe(401);
    });
  });
});
