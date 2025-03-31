const express = require('express');
const { initializePayment, getPayment, getAllPayments } = require('../controllers/payment.controller');

const router = express.Router()

// Initialize payment and store payment details
router.get('/', getAllPayments);

// Initialize payment and store payment details
router.post('/initialize-payment', initializePayment);

// Retrieve payment details by reference
router.get('/payment/:reference', getPayment);

module.exports = router;
