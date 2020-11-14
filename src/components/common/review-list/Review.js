import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import './Review.css';
import {strToDate, strToDDMMYYYY} from '../../../helpers/dateConverters';
import ReadMore from '../../common/ReadMore';
import ReviewForm from './ReviewForm';
import fetchData from '../../../helpers/fetchData';
import {UserAuthContext} from '../../../contexts/UserAuth';
import convertUrl from '../../../helpers/pathConverter';
import Image from '../../common/Image';
import Error from '../Error';
import {REVIEWS_URL} from '../../../constants/urls';
import {MODIFIABLE_PERIOD} from '../../../constants/time';

export default ({type, reviewData, onDeleteReview}) => {
    const [review, setReview] = useState(reviewData);
    const [displayActions, setDisplayActions] = useState(false);
    const [editingMode, setEditingMode] = useState(false);
    const [errors, setErrors] = useState(null);
    const {isLoggedIn, credentials, checkAuthErrors} = useContext(UserAuthContext);
    const toggleActions = () => {
        setDisplayActions(!displayActions);
    };
    const isRemovable = type === 'admin' || (isLoggedIn && review.creator._id === credentials.userId);
    const isModifiable = type === 'admin' ||
        (isLoggedIn &&
            (Date.now() - strToDate(review.createdAt) <= MODIFIABLE_PERIOD) &&
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
            const result = await fetchData({
                url: `${REVIEWS_URL}/${reviewData._id}`,
                token: credentials.token,
                method: 'DELETE'
            });
            if (result.errors.length) {
                checkAuthErrors(result);
                return setErrors(result.errors);
            }
            onDeleteReview(reviewData._id);
        }
    };
    return (
            <article className="review__container">
                {(type !== 'user') &&
                    <Image url={convertUrl(review.creator.photoUrl)} width="3rem" height="3rem" classes="review__photo" alt="user" />
                }
                <div className="review__body">
                    <div className="review__header">
                        <div className="review__subheader">
                            <Error errors={errors} />
                            <span className="review__name">{type === 'user' ?
                                <Link to={`restaurant/${review.restaurant._id}`} target="_blank" rel="noreferrer noopener">{review.restaurant.name}</Link> :
                                review.creator.username}
                            </span>
                            { !editingMode && <span>{review.rating}/5</span> }
                            <span className="review__date">{strToDDMMYYYY(review.updatedAt)}</span>
                        </div>
                        { isRemovable && <button onClick={toggleActions} className="btn--arrow" aria-label={displayActions ? 'Close' : 'Show actions'}>
                            { displayActions ?
                                <i className="fas fa-angle-up"></i> :
                                <i className="fas fa-angle-down"></i>
                            }
                        </button> }
                    </div>
                    {editingMode ?
                        <ReviewForm updateReview={onUpdate} onReset={resetChanges} review={review} /> :
                        <div className="review__text"><ReadMore text={review.text} key={review.text} numChar={100} readMoreText={'Read More'} /></div>
                    }
                    {displayActions &&
                        <div className="review__action-block">
                            <ul>
                                {isModifiable && !editingMode && <li className="review__action-item" onClick={openEditingMode}>Change</li>}
                                <li className="review__action-item" onClick={onDelete}>Delete</li>
                            </ul>
                        </div>
                    }
                </div>
            </article>
    );
};
