const PaymentService = require('../services/payment.service');

const paymentInstance = new PaymentService();

exports.initializePayment = async (req, res) => {
    try {
        const response = await paymentInstance.initializePayment(req.body);
        res.status(201).json({ status: "Success", data: response });
    } catch (error) {
        console.error("Start Payment Error:", error);
        res.status(500).json({ status: "Failed", message: error.message || "An error occurred" });
    }
};

exports.getPayment = async (req, res) => {
    try {
        const { reference } = req.params;
        if (!reference) {
            return res.status(400).json({ status: "Failed", message: "Reference is required" });
        }

        const response = await paymentInstance.verifyPayment(reference); 

        if (!response) {
            return res.status(404).json({ status: "Failed", message: "Payment not found" });
        }

        res.status(200).json({ status: "Success", data: response });
    } catch (error) {
        console.error("Get Payment Error:", error);
        res.status(500).json({ status: "Failed", message: error.message || "An error occurred" });
    }
};

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await paymentInstance.getAllPayments();

        if (!payments || payments.length === 0) {
            return res.status(404).json({ status: "Failed", message: "No payments found" });
        }

        res.status(200).json({ status: "Success", data: payments });
    } catch (error) {
        console.error("Get All Payments Error:", error);
        res.status(500).json({ status: "Failed", message: error.message || "An error occurred" });
    }
};
