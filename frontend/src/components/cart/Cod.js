import React, { Fragment, useEffect } from 'react'

import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { createCodOrder, clearErrors } from '../../actions/orderActions'


// import axios from 'axios';
// import { json } from 'body-parser';


const Cod = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    // const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo, lensPrescription } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.auth)
    const { error } = useSelector(state => state.codOrder)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo,
        lensPrescription,
        user
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        // console.log(order)
        // console.log(orderInfo)

        const {
            orderItems,
            shippingInfo,
            lensPrescription,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        } = order;

        // console.log({
        //     orderItems,
        //     shippingInfo,
        //     lensPrescription,
        //     itemsPrice,
        //     taxPrice,
        //     shippingPrice,
        //     totalPrice,
        // })

        document.querySelector('#pay_btn').disabled = true;

        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }

        try {

            // const data = await axios.post('/api/v1/codOrder/new', JSON.stringify({ ...order, ...orderInfo }), config
            // )
            // const clientSecret = res.data.client_secret;

            // console.log(clientSecret);



            // The payment is processed or not
            // if (result.paymentIntent.status === 'succeeded') {

            //     order.paymentInfo = {
            //         id: result.paymentIntent.id,
            //         status: result.paymentIntent.status
            //     }

            dispatch(createCodOrder({
                orderItems,
                shippingInfo,
                lensPrescription,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
            }));

            history.push('/success')
        }


        catch (error) {
            document.querySelector('#pay_btn').disabled = false;
            alert.error(error.response.data.message)
        }
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />
            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h3 className="mb-4">Cash on Delivery</h3>
                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-primary btn-block"
                        >
                            Amount {` : ${orderInfo && orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>

            </div>
        </Fragment>
    )

}


export default Cod;
