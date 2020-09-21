import React, {useState} from 'react';
import './Review.css';
import {strToDate, strToDDMMYYYY} from "../helpers/dateConverters";
import ReadMore from "./ReadMore";
import ReviewForm from "./ReviewForm";

export default ({type, reviewData}) => {
    const [review, setReview] = useState(reviewData);
    const [displayActions, setDisplayActions] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const toggleActions = () => {
        setDisplayActions(!displayActions);
    };
    const isModifiable = type === 'admin' || (Date.now() - strToDate(review.createdAt) <= 48 * 60 * 60 * 1000);
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
    return (
            <div className="review__container">
                {type === 'user' ? '' :
                    <img src="" className="review__photo"/>
                }
                <div className="review__body">
                    <div className="review__header">
                        <div className="review__subheader">
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
                        <div className="review__text"><ReadMore text={review.text} numChar={100} readMoreText={'Read More'} /></div>
                    }
                    {(displayActions && isModifiable) ?
                        <div className="review__action-block">
                            <ul>
                                <li className="review__action-item" onClick={openEditingMode}>Change</li>
                                <li className="review__action-item">Delete</li>
                            </ul>
                        </div> : ''
                    }
                </div>
            </div>
    );
};
