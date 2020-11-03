import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {convertUrl} from '../../helpers/pathConverters';
import '../../components/Restaurant/Restaurant.css';
import Map from '../../components/Restaurant/Map';
import ReviewList from '../../components/common/review-list/ReviewList';
import ReviewForm from '../../components/common/review-list/ReviewForm';
import {UserAuthContext} from '../../contexts/UserAuth';
import InfiniteScroll from '../../components/common/infinite-scroll/InfiniteScroll';
import Image from '../../components/common/Image';
import RestaurantLoader from '../../components/Restaurant/RestaurantLoader';
import {withInfiniteScroll} from '../../components/common/infinite-scroll/withInfiniteScroll';
import Error from '../../components/common/Error';
import Header from "../../components/common/Header";
import {RESTAURANT_URL, REVIEWS_URL} from "../../constants/urls";
import useFetchDataDidMount from "../../hooks/useFetchDataDidMount";

const Restaurant = (props) => {
    const {restaurantId} = useParams();
    const {isLoggedIn} = useContext(UserAuthContext);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const [imgWidth, setImgWidth] = useState('100vw');
    const history = useHistory();
    const [restaurant, restaurantErrors] = useFetchDataDidMount({
        initialValue: null,
        url: `${RESTAURANT_URL}/${restaurantId}`,
        itemType: 'restaurant'
    });
    const {
        items: reviews,
        setItems: setReviews,
        totalNumber: totalNumberReviews,
        setTotalNumber: setTotalNumberReviews,
        isFetching: isFetchingReviews,
        nextItems,
        itemErrors: reviewErrors,
        fetchItems
    } = props;
    const reviewsUrl = `${REVIEWS_URL}?filter=restaurant::${restaurantId}`;
    const fetchReviews = () => (fetchItems(reviewsUrl, 'reviews'));
    const toggleShowReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };
    const addReviewClick = () => {
        return !isLoggedIn ? history.push('/login', {errors: ['Please log in the system.']}) : toggleShowReviewForm();
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
        if(newReview) {
            setTotalNumberReviews(prev => prev + 1);
            setReviews(prevState => [newReview, ...prevState]);
        }
    }, [newReview]);
    return (
        (restaurant || restaurantErrors) ?
            <main className="restaurant__container">
                <Header classContainer={'light'} level={1} title={restaurant ? restaurant.name : 'Error'}/>
                <section className="restaurant__body">
                    {restaurant && <>
                        <Image url={convertUrl(restaurant.photoUrl)} classes="restaurant__image" alt={restaurant.name} width={imgWidth} height="50vh"/>
                        <section className="restaurant__description">
                            {restaurant.description}
                        </section>
                        <section className="restaurant__additional-info">
                            <section className="restaurant__stat">
                                <span className="restaurant__rating"><i className="fas fa-asterisk"></i> {restaurant.numReviews ? restaurant.rating : '-'}/5</span>
                                <span className="restaurant__reviews">{restaurant.numReviews} reviews</span>
                                { !showReviewForm && <button className="btn btn--red" onClick={addReviewClick}>Add Review</button> }
                            </section>
                            <section className="restaurant__map-block">
                                <Map lat={restaurant.location.coordinates[1]} lng={restaurant.location.coordinates[0]}/>
                                <a href={`http://maps.google.com/maps/place/${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`} target="_blank" rel="noreferrer noopener">{restaurant.location.formattedAddress}</a>
                            </section>
                        </section>
                        {showReviewForm &&
                            <section className="restaurant__review-form">
                                <h3>New Review</h3>
                                <ReviewForm restaurantId={restaurantId} addReview={addReview} onReset={toggleShowReviewForm}/>
                            </section>
                        }
                        <section className="restaurant__review-block">
                            <header className="restaurant__review-header">
                                <h2>Reviews</h2>
                            </header>
                            <div className="restaurant-review-list__container">
                                <ReviewList type="restaurant"
                                            reviews={reviews}
                                            errors={reviewErrors}
                                            setReviews={setReviews}
                                            totalNumber={totalNumberReviews}
                                            setTotalNumber={setTotalNumberReviews}
                                />
                                <InfiniteScroll
                                    fetchItems={fetchReviews}
                                    type="reviews"
                                    isFetching={isFetchingReviews}
                                    nextItems={nextItems}
                                />
                            </div>
                        </section>
                    </>}
                    <Error errors={restaurantErrors} />
                </section>
            </main> :
            <RestaurantLoader width={imgWidth} />
    );
};

export default withInfiniteScroll(Restaurant);
