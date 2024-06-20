import request from "supertest";
import app from "../../app.js"; // Adjust path as needed

describe("Authentication API Integration Tests", () => {
  let accessToken = "";

  beforeAll((done) => {
    // Perform login to get access token
    request(app)
      .post("/api/auth/login")
      .send({
        email: "chirag@gmail.com",
        password: "password123",
      })
      .end((err, res) => {
        if (err) {
          console.error(err);
          return done(err);
        }
        accessToken = res.body.access_token; // Store the access token
        done();
      });
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("User created successfully!");
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login with valid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("access_token");
    });

    // Add more test cases for different scenarios
  });

  describe("GET /api/user/profile", () => {
    it("should return profile for logged in user", async () => {
      const res = await request(app)
        .get("/api/user/profile")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(res.statusCode).toBe(200);
      // Add assertions for profile data
    });

    it("should return 401 if not logged in", async () => {
      const res = await request(app).get("/api/user/profile");

      expect(res.statusCode).toBe(401);
    });

    // Add more test cases for different scenarios
  });
});
