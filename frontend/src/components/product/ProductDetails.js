import React, { Fragment, useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap';

import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import ListReviews from '../review/ListReviews'
import lensDetails from '../../LensPrescription';

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, newReview, clearErrors } from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions'
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

import { saveLensPrescriptionInfo } from '../../actions/cartActions';

const ProductDetails = ({ match, history }) => {

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { lensPrescription } = useSelector(state => state.cart)

    //lens Prec
    // const [lensPrc, setLensPrc] = useState(lensPrescription.{ Oval: '', Rect: '', Sphere: '', Xyz: '' })
    //or
    const [sphericalLeft, setSphericalLeft] = useState(lensDetails.Spherical_left[0])
    const [sphericalRight, setSphericalRight] = useState(lensDetails.Spherical_right[0])

    const [cylinderLeft, setCylinderLeft] = useState(lensDetails.Cylinder_left[0])
    const [cylinderRight, setCylinderRight] = useState(lensDetails.Cylinder_right[0])

    const [pdLeft, setPDLeft] = useState(lensDetails.PD_Left[0])
    const [pdRight, setPDRight] = useState(lensDetails.PD_Right[0])

    const [axisLeft, setAxisLeft] = useState(lensDetails.Axis_left[0])
    const [axisRight, setAxisRight] = useState(lensDetails.Axis_right[0])

    //img prescription
    const [uploadedPrescription, setUploadedPrescription] = useState('')
    const [avatar, setAvatar] = useState('')


    const [addCartBtn, setAddCartBtn] = useState(true)

    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(state => state.productDetails)
    const { user } = useSelector(state => state.auth)
    const { error: reviewError, success } = useSelector(state => state.newReview)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors())
        }

        if (success) {
            alert.success('Reivew posted successfully')
            dispatch({ type: NEW_REVIEW_RESET })
        }

    }, [dispatch, alert, error, reviewError, match.params.id, success])

    const addToCart = () => {
        dispatch(addItemToCart(match.params.id, quantity));
        alert.success('Item Added to Cart')
        history.push('/cart')
    }

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {

        const count = document.querySelector('.count')

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty)

    }


    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        if (comment === '') {
            alert.error('Please Write your reviews')
            return;
        } else {

            const formData = new FormData();

            formData.set('rating', rating);
            formData.set('comment', comment);
            formData.set('productId', match.params.id)

            dispatch(newReview(formData));
        }
    }

    //lens Details
    const onChange = (event) => {
        // console.log(event.target.files[0])
        if (event.target.name === 'lensImage') {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(reader.result)
                    // setAvatar(event.target.files[0])
                    setUploadedPrescription(reader.result)
                }
            }

            reader.readAsDataURL(event.target.files[0])

            // console.log(reader, "==>")

        } else {
            // console.log()
            setUploadedPrescription(event.target.value)
        }
    }


    const lenSubmit = (e) => {
        e.preventDefault()
        // console.log("called");
        if (sphericalLeft === "Select" || sphericalRight === "Select" || cylinderLeft === "Select" || cylinderRight === "Select" || axisLeft === "Select" || axisRight === "Select" || pdLeft === "Select" || pdRight === "Select") {
            // console.log(sphericalLeft,
            //     sphericalRight,
            //     cylinderLeft,
            //     cylinderRight,
            //     axisLeft,
            //     axisRight,
            //     pdLeft, pdRight,
            //     uploadedPrescription)
            alert.error('Please Enter Your Lens Details');
            // return;

        } else {
            // console.log(sphericalLeft,
            //     sphericalRight,
            //     cylinderLeft,
            //     cylinderRight,
            //     axisLeft,
            //     axisRight,
            //     pdLeft, pdRight,
            //     uploadedPrescription)


            setAddCartBtn(false);
            var formData = new FormData();
            formData.append("avatar", avatar)
            // sessionStorage.setItem('lenPrc', JSON.stringify(lensPrc)
            dispatch(saveLensPrescriptionInfo({
                sphericalLeft,
                sphericalRight,
                cylinderLeft,
                cylinderRight,
                axisLeft,
                axisRight,
                pdLeft, pdRight,
                uploadedPrescription
            }));
            alert.success('Prescription added')
        }
    }


    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={product.name} />
                    <form encType="multipart/form-data">
                        <div className="row d-flex justify-content-around">
                            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                                <Carousel pause='hover'>
                                    {product.images && product.images.map(image => (
                                        <Carousel.Item key={image.public_id}>
                                            <img className="d-block w-100" src={image.url} alt={product.title} />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>


                            <div className="col-12 col-lg-5 mt-5">
                                <div>
                                    <br />
                                </div>
                                <h3>{product.name}</h3>
                                <p id="product_id">Product # {product._id}</p>

                                <hr />

                                <div className="rating-outer">
                                    <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                </div>
                                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

                                <hr />

                                <p id="product_price">Rs.{product.price}</p>
                                <div className="stockCounter d-inline text-center">
                                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                </div>
                                <hr />
                                <div>
                                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-3"
                                        data-target="#mymodel" data-toggle="modal"
                                        disabled={product.stock === 0}
                                    > Lens Priscription

                                    </button>
                                    &nbsp;
                                    <div className="container-fluid modal fade" id="mymodel">
                                        <div className="modal-dialog">
                                            <div className="modal-content">

                                                {/* <div className="modal-header">
                                                    <h3 className="text-center text-primary">Lens Priscription</h3>
                                                    <button type="button" className="close" data-dismiss="modal"> &times; </button>
                                                </div> */}

                                                <div className="modal-body">
                                                    <div className="row">
                                                        <h4>Lens Prescription</h4>

                                                        <div className='form-group'>
                                                            {/* <label htmlFor='avatar_upload'>Avatar</label> */}
                                                            <div className='d-flex align-items-center'>
                                                                <div>
                                                                    <figure className='avatar mr-3'>
                                                                        <img
                                                                            src={uploadedPrescription ? uploadedPrescription : '/images/lensPrescription.png'}
                                                                            className='rounded-circle'
                                                                            alt='uploadedPrescription Preview'
                                                                        />
                                                                    </figure>
                                                                </div>

                                                                <div className='custom-file'>
                                                                    <input
                                                                        type='file'
                                                                        name='lensImage'
                                                                        className='custom-file-input'
                                                                        id='customFile'
                                                                        accept="images/*"
                                                                        onChange={onChange}
                                                                    />
                                                                    <label className='custom-file-label' htmlFor='customFile'>
                                                                        upload Receipt
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <table class="table table-bordered col-md-12">
                                                            <thead>
                                                                <tr className="bg-light">
                                                                    <th>Lens</th>
                                                                    <th>Left Eye</th>
                                                                    <th>Right Eye</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="col-10">
                                                                <tr>
                                                                    <td>Sph.</td>

                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" required onChange={(e) => setSphericalLeft(e.target.value)}>
                                                                            {lensDetails.Spherical_left.map((spericalLeft, index) => (
                                                                                <option value={spericalLeft} key={index}>{spericalLeft}</option>

                                                                            ))}
                                                                        </select>
                                                                    </td>

                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" onChange={(e) => setSphericalRight(e.target.value)} >
                                                                            {
                                                                                lensDetails.Spherical_right.map((sphericalRight, index) => (
                                                                                    <option value={sphericalRight} key={index}>{sphericalRight}</option>
                                                                                ))
                                                                            }

                                                                        </select>

                                                                    </td>

                                                                </tr>


                                                                <tr>
                                                                    <td>Cydr</td>
                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" required onChange={(e) => setCylinderLeft(e.target.value)}>
                                                                            {lensDetails.Cylinder_left.map((cylinderLeft, index) => (
                                                                                <option value={cylinderLeft} key={index}>{cylinderLeft}</option>

                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" required onChange={(e) => setCylinderRight(e.target.value)}>
                                                                            {lensDetails.Cylinder_right.map((cylinderRight, index) => (
                                                                                <option value={cylinderRight} key={index}>{cylinderRight}</option>

                                                                            ))}

                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Axis</td>
                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" required onChange={(e) => setAxisLeft(e.target.value)}>
                                                                            {lensDetails.Axis_left.map((axisLeft) => (
                                                                                <option value={axisLeft}>{axisLeft}</option>

                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" required onChange={(e) => setAxisRight(e.target.value)}>
                                                                            {lensDetails.Axis_right.map((axisRight) => (
                                                                                <option value={axisRight}>{axisRight}</option>

                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td>PD</td>
                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" required onChange={(e) => setPDLeft(e.target.value)}>
                                                                            {lensDetails.PD_Left.map((pdLeft, index) => (
                                                                                <option value={pdLeft} key={index}>{pdLeft}</option>

                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <select className="d-flex align-content-center w-100 p-1 border-0"
                                                                            name="lens" required onChange={(e) => setPDRight(e.target.value)}>
                                                                            {lensDetails.PD_Right.map((pdRight, index) => (
                                                                                <option value={pdRight} key={index}>{pdRight}</option>

                                                                            ))}
                                                                        </select>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>

                                                        <div class="container">
                                                            <div className="d-flex justify-content-center">
                                                                <button
                                                                    className="btn btn-outline-success"
                                                                    type="submit"
                                                                    onClick={lenSubmit}
                                                                    data-dismiss="modal"
                                                                    aria-label="Close"
                                                                >
                                                                    submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-3"
                                        disabled={addCartBtn}
                                        onClick={addToCart}>
                                        Add to Cart
                                    </button>
                                </div>

                                <hr />

                                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >
                                    {product.stock > 0 ? 'In Stock' : 'Comming Soon'}</span></p>

                                <hr />

                                <h4 className="mt-2">Description:</h4>
                                <p>{product.description}</p>
                                <hr />
                                {/* <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p> */}

                                {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4"
                                    data-toggle="modal" data-target="#ratingModal"
                                    onClick={setUserRatings}>
                                    Submit Your Review
                                </button>
                                    :
                                    <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                                }


                                <div className="row mt-2 mb-5">
                                    <div className="rating w-50">

                                        <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
                                            aria-labelledby="ratingModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">

                                                        <ul className="stars" >
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                            <li className="star"><i className="fa fa-star"></i></li>
                                                        </ul>

                                                        <textarea
                                                            name="review"
                                                            id="review" className="form-control mt-3"
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        >

                                                        </textarea>

                                                        <button className="btn my-3 float-right review-btn px-4 text-white"
                                                            onClick={reviewHandler}
                                                            data-dismiss="modal" aria-label="Close">Submit</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}

                </Fragment>
            )
            }
        </Fragment>
    )
}

export default ProductDetails
