import React, {useContext, useEffect, useState} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import fetchData from "../../helpers/fetchData";
import {convertUrl} from "../../helpers/pathConverters";
import './Restaurant.css';
import Map from "../../components/Map";
import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";
import {UserAuthContext} from "../../contexts/UserAuth";

export default () => {
    const {restaurantId} = useParams();
    const [errors, setErrors] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState(null);
    const {isLoggedIn} = useContext(UserAuthContext);
    const history = useHistory();
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
            setErrors(fetchedData.errors);
        };
        fetchingRestaurant();
    }, []);
    return ( restaurant ?
            <main className="restaurant__container">
                <header className="heading__container heading__container--light">
                    <h1 className="heading">{restaurant.name}</h1>
                </header>
                <div className="restaurant__body">
                    <img src={convertUrl(restaurant.photoUrl)} className="restaurant__image" alt="restaurant"/>
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
                            <a href={`http://maps.google.com/maps/place/${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`} target="_blank">{restaurant.location.formattedAddress}</a>
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
                        <ReviewList type="restaurant" key={newReview} accessedObj={{restaurantId: restaurant._id, newReview}}/>
                    </div>
                </div>
            </main> : ''
    );
};
