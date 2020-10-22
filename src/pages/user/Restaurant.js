import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import fetchData from "../../helpers/fetchData";
import {convertUrl} from "../../helpers/pathConverters";
import './Restaurant.css';
import Map from "../../components/Map";
import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";
import {UserAuthContext} from "../../contexts/UserAuth";
import InfiniteScroll from "../../components/InfiniteScroll";
import Image from "../../components/Image";
import RestaurantLoader from "../../components/loaders/RestaurantLoader";
import {withInfiniteScroll} from "../../components/withInfiniteScroll";
import Error from "../../components/Error";

const Restaurant = (props) => {
    const {restaurantId} = useParams();
    const [restaurantErrors, setRestaurantErrors] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const {isLoggedIn} = useContext(UserAuthContext);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const [reviewErrors, setReviewErrors] = useState(null);
    const [imgWidth, setImgWidth] = useState('100vw');
    const history = useHistory();
    const {
        items: reviews,
        setItems: setReviews,
        page,
        totalNumber: totalNumberReviews,
        setTotalNumber: setTotalNumberReviews,
        isFetching: isFetchingReviews,
        nextItems
    } = props;

    const toggleShowReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };
    const addReviewClick = () => {
        return !isLoggedIn ? history.push('/login') : toggleShowReviewForm();
    };
    const addReview = (review) => {
        setShowReviewForm(false);
        setNewReview(review);
    };
    useEffect(() => {
        if(window.innerWidth >= 705) {
            setImgWidth('35rem');
        }
    }, []);
    useEffect(() => {
        const fetchingRestaurant = async () => {
            const fetchedData = await fetchData(`http://localhost:8080/restaurant/${restaurantId}`, {
                crossDomain: true,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!fetchedData.errors.length) {
                return setRestaurant({...fetchedData.response.restaurant, ...fetchedData.response.reviewsStat});
            }
            setRestaurantErrors(fetchedData.errors);
        };
        fetchingRestaurant();
    }, []);
    useEffect(() => {
        if(newReview) {
            setTotalNumberReviews(prev => prev + 1);
            setReviews(prevState => [newReview, ...prevState]);
        }
    }, [newReview]);
    const fetchingReviews = async () => {
        isFetchingReviews.current = true;
        const headers = {
            'Content-Type': 'application/json'
        };
        const fetchedData = await fetchData(`http://localhost:8080/reviews?filter=restaurant::${restaurantId}&page=${page.current}`, {
            crossDomain: true,
            method: 'GET',
            headers
        });
        isFetchingReviews.current = false;
        if (!fetchedData.errors.length) {
            page.current++;
            !totalNumberReviews && setTotalNumberReviews(fetchedData.response.totalNumber);
            return setReviews(prevVal => prevVal ? [...prevVal, ...fetchedData.response.reviews] : fetchedData.response.reviews);
        }
        setReviewErrors(fetchedData.errors);
    };
    return (
        (restaurant || restaurantErrors) ?
            <main className="restaurant__container">
                <header className="heading__container heading__container--light">
                    <h1 className="heading">{restaurant ? restaurant.name : 'Error'}</h1>
                </header>
                <div className="restaurant__body">
                    {restaurant && <>
                        <Image url={convertUrl(restaurant.photoUrl)} classes="restaurant__image" alt={restaurant.name} width={imgWidth} height="50vh"/>
                        <div className="restaurant__description">
                            {restaurant.description}
                        </div>
                        <div className="restaurant__additional-info">
                            <div className="restaurant__stat">
                                <span className="restaurant__rating"><i className="fas fa-asterisk"></i> {restaurant.numReviews ? restaurant.rating : '-'}/5</span>
                                <span className="restaurant__reviews">{restaurant.numReviews} reviews</span>
                                { !showReviewForm && <button className="btn btn--red" onClick={addReviewClick}>Add Review</button> }
                            </div>
                            <div className="restaurant__map-block">
                                <Map lat={restaurant.location.coordinates[1]} lng={restaurant.location.coordinates[0]}/>
                                <a href={`http://maps.google.com/maps/place/${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`} target="_blank" rel="noreferrer noopener">{restaurant.location.formattedAddress}</a>
                            </div>
                        </div>
                        {showReviewForm &&
                            <div className="restaurant__review-form">
                                <h3>New Review</h3>
                                <ReviewForm restaurantId={restaurantId} addReview={addReview}
                                            onReset={toggleShowReviewForm}/>
                            </div>
                        }
                        <div className="restaurant__review-block">
                            <header className="restaurant__review-header">
                                <h2>Reviews</h2>
                            </header>
                            <div className="restaurant-review-list__container">
                                <ReviewList type="restaurant" reviews={reviews} errors={reviewErrors} setReviews={setReviews} totalNumber={totalNumberReviews} setTotalNumber={setTotalNumberReviews}/>
                                <InfiniteScroll fetchItems={fetchingReviews} type="reviews" isFetching={isFetchingReviews} nextItems={nextItems}/>
                            </div>
                        </div>
                    </>}
                    {restaurantErrors && <Error errors={restaurantErrors} />}
                </div>
            </main> :
            <RestaurantLoader width={imgWidth} />
    );
};

export default withInfiniteScroll(Restaurant);
