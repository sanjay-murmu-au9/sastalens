const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const Razorpay = require('razorpay')
const shortid = require('shortid')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const razorpay = new Razorpay({
    key_id: 'rzp_test_DfDyhvh0QDalkJ',
    key_secret: '3y33LkQQuo169xOiOZRxwIFA'
})

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'inr',

        metadata: { integration_check: 'accept_a_payment' }
    });

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })

})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})

//RAzorPay
exports.rozarPayment = catchAsyncErrors(async (req, res, next) => {

    const payment_capture = 1
    const amount = 499
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }

    const response = await razorpay.orders.create(options)
    console.log(response);
    // res.send('ok');
    res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
    })

})

