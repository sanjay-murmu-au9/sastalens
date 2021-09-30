import axios from 'axios';

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,

    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAIL,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    CREATE_CODORDER_REQUEST,
    CREATE_CODORDER_SUCCESS,
    CREATE_CODORDER_FAIL,

    CODORDER_DETAILS_REQUEST,
    CODORDER_DETAILS_SUCCESS,
    CODORDER_DETAILS_FAIL,

    CLEAR_ERRORS
} from '../constants/orderConstants'

// var FormData = require('form-data');

export const createOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/order/new', order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Get curretly logged in user orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me')
        // console.log(data, '==>>')

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {

        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`)
        // console.log(data, 'single data')

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get Codorder details
export const codGetDetails = (id) => async (dispatch) => {
    try {

        dispatch({ type: CODORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/codOrder/${id}`)


        dispatch({
            type: CODORDER_DETAILS_SUCCESS,
            payload: data.codOrder
        })

    } catch (error) {
        dispatch({
            type: CODORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get all orders - ADMIN
export const allOrders = () => async (dispatch) => {
    try {
        // console.log('allOrders')
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get(`/api/v1/admin/orders`)
        // console.log(data, 'action data')

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        // console.log(error, 'error')
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

// update order
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_ORDER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config)
        console.log(data, "updatesingledata===>>")

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete order
export const deleteOrder = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ORDER_REQUEST })

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}


// Cash on delivery order
export const createCodOrder = (order) => async (dispatch, getState) => {
    try {

        dispatch({ type: CREATE_CODORDER_REQUEST })

        // const formData = new FormData();
        // formData.append("lensPrescription", order.lensPrescription.uploadedPrescription);

        // order.lensPrescription.uploadedPrescription = formData;
        const config = {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'multipart/form-data'
            }
        }
        // console.log(order, "COD");
        const { data } = await axios.post('/api/v1/codOrder/new', JSON.stringify(order), config)
        // console.log(data, "COD");

        dispatch({
            type: CREATE_CODORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CREATE_CODORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}