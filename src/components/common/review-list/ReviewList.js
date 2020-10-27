import React from 'react';
import Review from './Review';
import './ReviewList.css';

export default ({type, reviews, errors, setReviews, totalNumber, setTotalNumber}) => {
    const onDeleteReview = (id) => {
        setReviews(reviews.filter(review => review._id !== id));
        setTotalNumber(prev => prev - 1);
    };
    return (
        <>
            { errors ? <div className="form__error-block">
                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                </div> : ''
            }
            { reviews ?
                (reviews.length ?
                <div className="review-list__body">
                    <span className="text--small-blue" style={{width: '100%', textAlign: 'right', margin: "0 3rem 1rem 0"}}>{totalNumber} reviews</span>
                    {reviews.map((review) => <Review type={type} reviewData={review} key={review._id} onDeleteReview={onDeleteReview}/>)}
                </div> :
                <div>No Reviews</div>) :
                null
            }
        </>
    );
};
