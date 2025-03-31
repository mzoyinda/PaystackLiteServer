const Payment = require("../models/payment");
const _ = require("lodash");
const { initializePayment, verifyPayment } = require("../utils/payment");

class PaymentService {
    async initializePayment(data) {
        try {
            // Extract only required fields
            const form = _.pick(data, ["amount", "email", "full_name"]);
            form.metadata = { full_name: form.full_name };
            form.amount *= 100; // Convert amount to kobo

            // Initialize payment
            const response = await initializePayment(form);
            const { reference, authorization_url } = response.data;

            // Save payment record in MongoDB
            const newPayment = new Payment({
                reference,
                amount: form.amount,
                email: form.email,
                full_name: form.full_name,
                status: "pending",
            });

            await newPayment.save();

            return {
                status: "success",
                message: "Payment initialized successfully.",
                data: { authorization_url, reference },
            };
        } catch (error) {
            console.error("Start Payment Service Error:", error.message);
            throw new Error(error.message || "Payment initialization failed.");
        }
    }

    async verifyPayment(reference) {
        try {
            if (!reference) {
                throw new Error("Reference is required");
            }

            // Check Paystack API for latest payment status
            const paystackResponse = await verifyPayment(reference);
            const paymentData = paystackResponse.data;

            if (!paymentData || paymentData.status !== "success") {
                throw new Error("Payment verification failed or payment not successful");
            }

            // 2️⃣ Find or create payment in DB
            let transaction = await Payment.findOne({ reference });

            if (!transaction) {
                // If transaction doesn't exist in DB, create it
                transaction = new Payment({
                    reference,
                    amount: paymentData.amount,
                    email: paymentData.customer.email,
                    full_name: paymentData.metadata?.full_name || "Unknown",
                    status: paymentData.status, // Set status based on Paystack API
                });

                await transaction.save();
            } else {
                // 3️⃣ Update existing transaction status
                transaction.status = paymentData.status;
                await transaction.save();
            }

            return transaction;
        } catch (error) {
            console.error("Payment Verification Error:", error.message);
            throw new Error(error.message || "Payment verification failed.");
        }
    }

    async getAllPayments() {
        try {
            const payments = await Payment.find().sort({ createdAt: -1 }); // Fetch all payments sorted by most recent
            return payments;
        } catch (error) {
            console.error("Fetch All Payments Error:", error);
            throw new Error("Could not retrieve payments.");
        }
    }
}

module.exports = PaymentService;
