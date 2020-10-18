import React from 'react';
import Review from "./Review";
import './ReviewList.css';

export default ({type, reviews, errors, setReviews}) => {
    const onDeleteReview = (id) => {
        setReviews(reviews.filter(review => review._id !== id));
    };
    return (
        <>
            { errors ? <div className="form__error-block">
                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                </div> : ''
            }
            { reviews ?
                (reviews.length ?
                <div className="user-review-list__body">
                    {reviews.map((review) => <Review type={type} reviewData={review} key={review._id} onDeleteReview={onDeleteReview}/>)}
                </div> :
                <div>No Reviews</div>) :
                null
            }
        </>
    );
};
