const PaymentService = require('../services/payment.service');

const paymentInstance = new PaymentService();

exports.startPayment = async (req, res) => {
    try {
        const response = await paymentInstance.startPayment(req.body);
        res.status(201).json({ status: "Success", data: response });
    } catch (error) {
        console.error("Start Payment Error:", error);
        res.status(500).json({ status: "Failed", message: error.message || "An error occurred" });
    }
};

// exports.createPayment = async (req, res) => {
//     try {
//         const response = await paymentInstance.createPayment(req.query);
//         res.status(201).json({ status: "Success", data: response });
//     } catch (error) {
//         console.error("Create Payment Error:", error);
//         res.status(500).json({ status: "Failed", message: error.message || "An error occurred" });
//     }
// };

exports.getPayment = async (req, res) => {
    try {
        const { reference } = req.params; // Extract reference from URL params
        if (!reference) {
            return res.status(400).json({ status: "Failed", message: "Reference is required" });
        }

        const response = await paymentInstance.paymentReceipt(reference); // Pass only the reference

        if (!response) {
            return res.status(404).json({ status: "Failed", message: "Payment not found" });
        }

        res.status(200).json({ status: "Success", data: response });
    } catch (error) {
        console.error("Get Payment Error:", error);
        res.status(500).json({ status: "Failed", message: error.message || "An error occurred" });
    }
};

