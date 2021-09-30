import React, { Fragment, useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import MetaData from './layout/MetaData'
import Product from './product/Product'
import Loader from './layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions'

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

const Home = ({ match }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('')
    const [rating, setRating] = useState(0)

    const categories = [
        'Men',
        'Women',
        'Kids',
        'Others',

    ]

    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products)

    const keyword = match.params.keyword
    // console.log(keyword, "==>");

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));


    }, [dispatch, alert, error, keyword, currentPage, price, category, rating])

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best lens Online'} />

                    <h3 id="products_heading" style={{ marginTop: '80px' }}>Latest Products</h3>

                    {keyword ? '' : <div className="container">
                        <ul className="row">
                            {categories.map(category => (
                                <li
                                    style={{
                                        cursor: 'pointer',
                                        listStyleType: 'none',
                                        // border: '1px solid black',
                                        // padding: '10px',
                                        marginRight: '10px',
                                        // marginBottom: '10px',
                                        display: 'inline-block',
                                        display: 'nowrap',
                                        textAlign: 'center'


                                    }}
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}

                                </li>
                            ))}
                        </ul>
                    </div>}

                    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="/images/Summar.jpeg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="/images/summary_sell.jpeg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="/images/exploreNewWorld.jpeg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="/images/Lens_pres.jpeg" className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src="/images/summar_sell_1.jpeg" className="d-block w-100" alt="..." />
                            </div>
                        </div>

                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <section id="products" className="container mt-5">
                        <div className="row">

                            {keyword ? (
                                <>
                                    <div className="col-4 col-md-3 mt-1 mb-5 mr-5">
                                        <div className="px-5">

                                            <div className="mt-0">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>

                                                <ul className="px-0">
                                                    {categories.map(category => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={category}
                                                            onClick={() => setCategory(category)}
                                                        >
                                                            {category}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <hr className="my-3" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <ul className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(star => (
                                                        <li
                                                            style={{
                                                                cursor: 'pointer',
                                                                listStyleType: 'none'
                                                            }}
                                                            key={star}
                                                            onClick={() => setRating(star)}
                                                        >
                                                            <div className="rating-outer">
                                                                <div className="rating-inner"
                                                                    style={{
                                                                        width: `${star * 20}%`
                                                                    }}
                                                                >
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <hr className="my-5" />
                                            <Range
                                                marks={{
                                                    1: `1`,
                                                    1000: `1000`
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `${value}`}
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                        </div>
                                    </div>

                                    <div className="col-8 col-12">
                                        <div className="row">
                                            {products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) :

                                (
                                    products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))

                                )

                            }

                        </div>
                    </section>

                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                // nextPageText={'Next'}
                                // prevPageText={'Prev'}
                                // firstPageText={'First'}
                                // lastPageText={'Last'}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    )}

                </Fragment>
            )
            }

        </Fragment>
    )
}

export default Home
