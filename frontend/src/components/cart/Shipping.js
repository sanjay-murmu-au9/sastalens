import React, { Fragment, useState } from 'react'
import State from '../../State';


import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'

import { useDispatch, useSelector } from 'react-redux'
import { saveShippingInfo } from '../../actions/cartActions'

const Shipping = ({ history }) => {
    const { shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    const [address, setAddress] = useState(shippingInfo.address)
    const [city, setCity] = useState(shippingInfo.city)
    // const [postalCode, setPostalCode] = useState(shippingInfo.postalCode)
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)
    const [state, setState] = useState(shippingInfo.state)
    const [userName, setUserName] = useState(user.name)
    const [pincode, setPincode] = useState(shippingInfo.pincode)
    const [errpincode, setErrPincode] = useState('')


    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingInfo({ address, city, phoneNo, pincode, state, userName }))
        history.push('/confirm')
    }

    const pincodeHandler = (e) => {
        setPincode(e.target.value)
        fetch(`https://api.postalpincode.in/pincode/${e.target.value}`, {
            method: 'GET'
        })
            .then(res => res.json())
            // .then(json => console.log(json, '===>'))
            .then(res => {
                if (res[0].Status === "Error") {
                    setErrPincode(res[0].Message)

                } else {
                    // console.log(res, "==>")
                    setErrPincode('')
                }
            })
    }

    return (
        <Fragment>

            <MetaData title={'Shipping Info'} />
            <CheckoutSteps shipping />

            <div className="row wrapper">
                <div className="col-12 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h4 className="mb-4">Shipping Info</h4>
                        <div className="form-group">
                            <label htmlFor="address_field">Name:</label>
                            <input
                                type="name"
                                id="user_Name"
                                className="form-control"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address_field">Address:</label>
                            <input
                                type="text"
                                id="address_field"
                                className="form-control"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                className="form-control"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="number"
                                id="phone_field"
                                className="form-control"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                                name="Phone Number"
                                pattern="[7-9]{1}[0-9]{9}"

                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                className="form-control"
                                value={pincode}
                                onChange={pincodeHandler}
                            />
                            {
                                errpincode && <p style={{ color: 'red' }}>{errpincode}</p>
                            }
                        </div>

                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <select
                                id="state_field" className="form-control"
                                onChange={(e) => setState(e.target.value)}
                                required="true">
                                {State.india.map((state, index) => (
                                    <option value={state} key={index}>{state}</option>
                                ))}

                            </select>
                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            className="btn btn-block"
                        >
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping
