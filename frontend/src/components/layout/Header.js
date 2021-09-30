import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

import Search from './Search'

import '../../App.css';

const Header = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }
    return (
        <Fragment>
            <nav className="container-fluid navBarHearder">
                <div className="row text-center allHaeder">
                    <div className="col-2 col-xs-6 col-md-2 logo">
                        <Link to="/">
                            <img src="/images/sastaLens.png" alt="Sasta lens" width="50px" />
                        </Link>
                    </div>

                    <div className="col-6 inputBox">


                        <Route render={({ history }) => <Search history={history} />} />

                        <Link to="/">
                            <h3 className="logoDesign">SASTALENS</h3>
                        </Link>
                    </div>

                    <div className="col-4 cardLog">
                        <Link to="/cart" style={{ textDecoration: 'none' }} >
                            <span id="cart" className="ml-3">Cart</span>
                            <span className="ml-1" id="cart_count">{cartItems.length}</span>
                        </Link>

                        {user ? (
                            <div className="ml-3 dropdown d-inline">
                                <Link to="#!" className="btn dropdown-toggle text-white mr-4"
                                    type="button" id="dropDownMenuButton" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">

                                    <figure className="avatar avatar-nav">
                                        <img
                                            src={user.avatar && user.avatar.url}
                                            alt={user && user.name}
                                            className="rounded-circle"
                                        />
                                    </figure>

                                    <span style={{ marginLeft: '18px' }}>{user && user.name}</span>
                                </Link>

                                <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                    {user && user.role === 'admin' && (
                                        <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                    )}
                                    <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                    <Link className="dropdown-item" to="/me">Profile</Link>
                                    <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                        Logout
                                    </Link>
                                </div>


                            </div>
                        )
                            : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>

                        }

                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header
