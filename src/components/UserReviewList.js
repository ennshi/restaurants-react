import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import Review from "./Review";
import fetchData from "../helpers/fetchData";
import {UserAuthContext} from "../contexts/UserAuth";
import './UserReviewList.css';

export default () => {
    const [errors, setErrors] = useState(null);
    const [reviews, setReviews] = useState(null);
    const {credentials, handleLogout} = useContext(UserAuthContext);
    const history = useHistory();
    useEffect(() => {
        const fetchingReviews = async () => {
            const fetchedData = await fetchData(`http://localhost:8080/reviews?filter=creator::${credentials.userId}`, {
                crossDomain: true,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${credentials.token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!fetchedData.errors.length) {
                return setReviews(fetchedData.response.reviews);
            }
            if(fetchedData.errors[0] === 'Authorization failed') {
                handleLogout();
                return history.push('/login', {errors: [fetchedData.errors[0]]});
            }
            setErrors(fetchedData.errors);
        };
        fetchingReviews();
    }, []);
    return (
        <div className="user-review-list__container">
            {errors ? <div className="form__error-block">
                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                </div> : ''
            }
            { reviews ?
                <> { reviews.length ?
                    <div className="user-review-list">
                        {reviews.map((review, i) => <Review type={'user'} review={review} key={i}/>)}
                    </div> :
                    <div>No Reviews</div>
                }
                </> : <p>Loading</p>
            }
        </div>
    );
};
