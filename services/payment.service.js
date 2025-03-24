const request = require('request');
const Payment = require('../models/payment');
const _ = require('lodash');
const { initializePayment, verifyPayment } = require('../utils/payment')(request);

class PaymentService {
    startPayment(data) {
        try {
            const form = _.pick(data, ['amount', 'email', 'full_name']);
            form.metadata = { full_name: form.full_name };
            form.amount *= 100; // Convert to kobo/cent
    
            return new Promise((resolve, reject) => {
                initializePayment(form, async (error, body) => {
                    if (error) {
                        console.error("Payment Initialization Error:", error.message);
                        return reject(error.message);
                    }
    
                    const response = JSON.parse(body);
                    const { reference, authorization_url } = response.data;
    
                    // 🔹 Save payment to MongoDB
                    const newPayment = new Payment({
                        reference,
                        amount: form.amount,
                        email: form.email,
                        full_name: form.full_name,
                        status: "pending", // Initial status before verification
                    });
    
                    await newPayment.save(); // Save to MongoDB
                    
                    resolve({
                        status: "success",
                        message: "Payment initialized successfully.",
                        data: {
                            authorization_url,
                            reference
                        }
                    });
                });
            });
        } catch (error) {
            console.error("Start Payment Service Error:", error);
            throw new Error("Payment initialization failed.");
        }
    }
    

    // createPayment(req) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             const ref = req.reference;
    //             if (!ref) {
    //                 return reject({ code: 400, msg: 'No reference passed in query!' });
    //             }

    //             verifyPayment(ref, async (error, body) => {
    //                 if (error) {
    //                     console.error("Payment Verification Error:", error.message);
    //                     return reject(error.message);
    //                 }

    //                 const response = JSON.parse(body);
    //                 if (!response.data) {
    //                     return reject({ code: 500, msg: "Invalid payment response" });
    //                 }

    //                 const { reference, amount, status, customer, metadata } = response.data;
    //                 const newPayment = {
    //                     reference,
    //                     amount,
    //                     email: customer.email,
    //                     full_name: metadata?.full_name || "N/A",
    //                     status
    //                 };

    //                 const payment = await Payment.create(newPayment);
    //                 resolve(payment);
    //             });
    //         } catch (error) {
    //             error.source = 'Create Payment Service';
    //             reject(error);
    //         }
    //     });
    // }

    paymentReceipt(reference) {
        return new Promise((resolve, reject) => {
            try {
                if (!reference) {
                    return reject({ code: 400, msg: 'Reference is required' });
                }
    
                Payment.findOne({ reference })
                    .then(transaction => {
                        if (!transaction) {
                            return reject({ code: 404, msg: 'Payment not found' });
                        }
                        resolve(transaction);
                    })
                    .catch(error => {
                        error.source = 'Payment Receipt';
                        reject(error);
                    });
    
            } catch (error) {
                error.source = 'Payment Receipt';
                reject(error);
            }
        });
    }
    
}

module.exports = PaymentService;
