import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

const __DEV__ = document.domain === 'localhost'

const Razorpay = () => {
    const [name, setName] = useState('Sastalens')
    async function displayRazorpay() {

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
        // debugger
        if (!res) {
            alert('Razorpay SDK failed to load.')
            return;
        }
        // api call
        const data = await fetch('http://localhost:3000/api/v1/razorpay', {
            method: 'POST'
        }).then((t) => t.json())

        console.log(data)

        const options = {
            key: __DEV__ ? "rzp_test_DfDyhvh0QDalkJ" : 'PRODUCTION_API_KEY',
            currency: data.currency,
            amount: data.amount.toString(),
            order_id: data.id,
            name: "Sastalens.com",
            description: "Thankyou for shopping with us.",
            image: "../../images/sastaLens.png",
            handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
            },
            prefill: {
                name
            }
        };
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    return (
        <div>
            <button onClick={displayRazorpay}>RazorPayment</button>
        </div>
    )
}

export default Razorpay;
