const axios = require("axios");

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
const PAYSTACK_BASE_URL = "https://api.paystack.co";

const initializePayment = async (form) => {
    try {
        const response = await axios.post(
            `${PAYSTACK_BASE_URL}/transaction/initialize`,
            form,
            {
                headers: {
                    authorization: PAYSTACK_SECRET_KEY,
                    "content-type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Payment Initialization Error:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Payment initialization failed");
    }
};

const verifyPayment = async (reference) => {
    try {
        const response = await axios.get(
            `${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`,
            {
                headers: {
                    authorization: PAYSTACK_SECRET_KEY,
                    "content-type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Payment Verification Error:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Payment verification failed");
    }
};

module.exports = { initializePayment, verifyPayment };
