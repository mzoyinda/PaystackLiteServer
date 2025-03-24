const express = require('express');
const { startPayment, getPayment } = require('../controllers/payment');

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the PayStacklite Server!" });
});

// Initialize payment and store payment details
router.post('/start-payment', startPayment);

// Retrieve payment details by reference
router.get('/payment/:reference', getPayment);

module.exports = router;
