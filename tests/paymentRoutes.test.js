const request = require("supertest");
const app = require("../app");

describe("Payment API", () => {
  test("should initialize payment successfully", async () => {
    const res = await request(app)
      .post("/api/v1/payments/initialize-payment")
      .send({ amount: 1000, email: "test@example.com", full_name: "Test User" });

    expect(res.status).toBe(201);
  });

  test("should retrieve all payments", async () => {
    const res = await request(app).get("/api/v1/payments/");
  
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status", "Success");
  
    if (res.body.data) {
      // Case where there are payments
      expect(Array.isArray(res.body.data)).toBe(true);
    } else {
      // Case where no payments exist
      expect(res.body).toHaveProperty("message");
    }
  });
  
});
