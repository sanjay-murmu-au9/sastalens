import React from 'react';
import './Product.css';
import { Link } from 'react-router-dom'

const Product = ({ product, col }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <Link to={`/product/${product._id}`}>
                    <img
                        className="card-img mx-auto"
                        src={product.images[0].url}
                    />
                </Link>
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-center mt-2">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h6>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">Rs.{product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn"
                        className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
    )
}

export default Product
