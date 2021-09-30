import { Fragment } from 'react';
import CheckoutSteps from './CheckoutSteps';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import Razorpay from './Razorpay';

const PaymentGateway = () => {
    return (
        <Fragment>
            <MetaData title={"Payment"} />
            <CheckoutSteps shipping confirmOrder />

            <div className="paymentOptions">
                <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                    className="fa fa-product-hunt"></i>  PAYMENT OPTIONS</a>
                <ul className="collapse list-unstyled" id="productSubmenu">
                    {/* <button>
                        <Link to="/carttopayment"> Card/Debit Card</Link>
                    </button> */}

                    <button className="m-20">
                        {/* <Link to="/admin/product"><i className="fa fa-plus"></i> Create</Link> */}
                        <Link to="/cashondelivery"> Cash On Delivery</Link>
                    </button>
                    {/* <li>
                        <Razorpay />
                    </li> */}

                </ul>


            </div>
            {/* <div className="differentOption mx-auto">
                <div type="button" id="cart_btn" className="btn btn-primary cart p-10">

                </div>
                <button type="button" id="cart_btn" className="btn btn-primary cart">
                    <Razorpay />
                </button>
                <div type="button" id="cart_btn" className="btn btn-primary cart">
                    <Link to="/cashondelivery"> Cash On Delivery</Link>

                </div>
            </div> */}
        </Fragment>
    )
}

export default PaymentGateway;
