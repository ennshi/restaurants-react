import React from 'react';
import Review from './Review';
import './ReviewList.css';
import InfoMessage from "../InfoMessage";
import Error from "../Error";

export default ({type, reviews, errors, setReviews, totalNumber, setTotalNumber}) => {
    const onDeleteReview = (id) => {
        setReviews(reviews.filter(review => review._id !== id));
        setTotalNumber(prev => prev - 1);
    };
    return (
        <>
            <Error errors={errors} />
            { reviews ?
                (reviews.length ?
                <div className="review-list__body">
                    <span className="text--small-blue" style={{width: '100%', textAlign: 'right', margin: "0 3rem 1rem 0"}}>{totalNumber} reviews</span>
                    {reviews.map((review) => <Review type={type} reviewData={review} key={review._id} onDeleteReview={onDeleteReview}/>)}
                </div> :
                <InfoMessage message="No Reviews" />) :
                null
            }
        </>
    );
};
