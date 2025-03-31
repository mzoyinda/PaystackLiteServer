const PaymentService = require("../services/payment.service");

const paymentService = new PaymentService();

describe("Payment Service", () => {
  test("should throw error if no reference is provided", async () => {
    await expect(paymentService.verifyPayment()).rejects.toThrow("Reference is required");
  });
});
