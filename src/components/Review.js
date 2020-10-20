import React, {useContext, useState} from 'react';
import './Review.css';
import {strToDate, strToDDMMYYYY} from "../helpers/dateConverters";
import ReadMore from "./ReadMore";
import ReviewForm from "./ReviewForm";
import fetchData from "../helpers/fetchData";
import {useHistory} from "react-router-dom";
import {UserAuthContext} from "../contexts/UserAuth";
import {convertUrl} from "../helpers/pathConverters";
import Image from "./Image";

export default ({type, reviewData, onDeleteReview}) => {
    const [review, setReview] = useState(reviewData);
    const [displayActions, setDisplayActions] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [errors, setErrors] = useState(null);
    const {isLoggedIn, credentials, handleLogout} = useContext(UserAuthContext);
    const history = useHistory();
    const toggleActions = () => {
        setDisplayActions(!displayActions);
    };
    const isModifiable = type === 'admin' ||
        (isLoggedIn &&
            (Date.now() - strToDate(review.createdAt) <= 48 * 60 * 60 * 1000) &&
            review.creator._id === credentials.userId);
    const openEditingMode = () => {
        setDisplayActions(false);
        setEditingMode(!editingMode);
    };
    const resetChanges = () => {
        setEditingMode(false);
    };
    const onUpdate = (review) => {
        setEditingMode(false);
        setReview(review);
    };
    const onDelete = async () => {
        setDisplayActions(false);
        if(window.confirm('Are you sure, you want to delete this review?')) {
            const result = await fetchData(`http://localhost:8080/reviews/${reviewData._id}`, {
                crossDomain: true,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${credentials.token}`
                }
            });
            if (result.errors.length) {
                if (result.errors[0] === 'Authorization failed') {
                    handleLogout();
                    return history.push('/login', {errors: [result.errors[0]]});
                }
                return setErrors(result.errors);
            }
            onDeleteReview(reviewData._id);
        }
    };
    return (
            <div className="review__container">
                {(type !== 'user') &&
                    <Image url={convertUrl(review.creator.photoUrl)} width="3rem" height="3rem" classes="review__photo" alt="user" />
                }
                <div className="review__body">
                    <div className="review__header">
                        <div className="review__subheader">
                            {errors ? <div className="form__error-block">
                                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                            </div> : ''}
                            <span className="review__name">{type === 'user' ? review.restaurant.name : review.creator.username}</span>
                            { editingMode ? '' : <span>{review.rating}/5</span> }
                            <span className="review__date">{strToDDMMYYYY(review.updatedAt)}</span>
                        </div>
                        { isModifiable ?
                            <button onClick={toggleActions} className="btn--arrow">
                                { displayActions ?
                                    <i className="fas fa-angle-up"></i> :
                                    <i className="fas fa-angle-down"></i>
                                }
                            </button> : ''
                        }
                    </div>
                    {editingMode ?
                        <ReviewForm updateReview={onUpdate} onReset={resetChanges} review={review} /> :
                        <div className="review__text"><ReadMore text={review.text} key={review.text} numChar={100} readMoreText={'Read More'} /></div>
                    }
                    {(displayActions && isModifiable) ?
                        <div className="review__action-block">
                            <ul>
                                <li className="review__action-item" onClick={openEditingMode}>Change</li>
                                <li className="review__action-item" onClick={onDelete}>Delete</li>
                            </ul>
                        </div> : ''
                    }
                </div>
            </div>
    );
};
