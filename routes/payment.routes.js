const express = require('express');
const { startPayment, getPayment } = require('../controllers/payment');

const router = express.Router()


// Initialize payment and store payment details
router.post('/start-payment', startPayment);

// // Verify and store payment details
// router.get('/verify-payment', createPayment);

// Retrieve payment details by reference
router.get('/payment/:reference', getPayment);

module.exports = router;
