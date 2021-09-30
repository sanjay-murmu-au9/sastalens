const express = require('express')
const router = express.Router();

const {
    processPayment,
    sendStripApi,
    rozarPayment
} = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/auth')

router.route('/payment/process').post(isAuthenticatedUser, processPayment);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);



///RazorPay
router.route('/razorpay').post(isAuthenticatedUser, rozarPayment)

module.exports = router;