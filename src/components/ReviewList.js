import React, {useContext, useEffect, useState} from 'react';
import Review from "./Review";
import fetchData from "../helpers/fetchData";
import './ReviewList.css';

export default ({type, accessedObj}) => {
    const [errors, setErrors] = useState(null);
    const [reviews, setReviews] = useState(null);
    useEffect(() => {
        const fetchingReviews = async () => {
            let headers;
            let filter;
            switch (type) {
                case 'user':
                    filter = `creator::${accessedObj.userId}`;
                    headers = {
                        'Authorization': `Bearer ${accessedObj.token}`,
                        'Content-Type': 'application/json'
                    };
                    break;
                case 'restaurant':
                    filter = `restaurant::${accessedObj.restaurantId}`;
                    headers = {
                        'Content-Type': 'application/json'
                    };
                    break;
                default:
                    filter = '';
                    headers = {
                        'Content-Type': 'application/json'
                    };
            }
            const fetchedData = await fetchData(`http://localhost:8080/reviews?filter=${filter}`, {
                crossDomain: true,
                method: 'GET',
                headers
            });
            if (!fetchedData.errors.length) {
                return setReviews(fetchedData.response.reviews);
            }
            if(type === 'user') {
                accessedObj.handleErrors(fetchedData);
            }
            setErrors(fetchedData.errors);
        };
        fetchingReviews();
    }, []);
    const onDeleteReview = (id) => {
        setReviews(reviews.filter(review => review._id !== id));
    };
    return (
        <div className={type === 'user' ? 'user-review-list__container' : 'restaurant-review-list__container'}>
            {errors ? <div className="form__error-block">
                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                </div> : ''
            }
            { reviews ?
                <> { reviews.length ?
                    <div className="user-review-list__body">
                        {reviews.map((review, i) => <Review type={type} reviewData={review} key={i} onDeleteReview={onDeleteReview}/>)}
                    </div> :
                    <div>No Reviews</div>
                }
                </> : <p>Loading</p>
            }
        </div>
    );
};
