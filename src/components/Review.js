import React, {useState} from 'react';
import './Review.css';
import {strToDate, strToDDMMYYYY} from "../helpers/dateConverters";
import ReadMore from "./ReadMore";

export default (props) => {
    const {type, review} = props;
    const [displayActions, setDisplayActions] = useState(false);
    const toggleActions = () => {
        setDisplayActions(!displayActions);
    };
    const isModifiable = type === 'admin' || (Date.now() - strToDate(review.createdAt) <= 24 * 60 * 60 * 1000);
    return (
            <div className="review__container">
                {type === 'user' ? '' :
                    <img src="" className="review__photo"/>
                }
                <div className="review__body">
                    <div className="review__header">
                        <div className="review__subheader">
                            <span className="review__name">{type === 'user' ? review.restaurant.name : review.creator.username}</span>
                            <span>{review.rating}/5</span>
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
                    <div className="review__text"><ReadMore text={review.text} numChar={100} readMoreText={'Read More'} /></div>
                    {(displayActions && isModifiable) ?
                        <div className="review__action-block">
                            <ul>
                                <li className="review__action-item">Change</li>
                                <li className="review__action-item">Delete</li>
                            </ul>
                        </div> : ''
                    }
                </div>
            </div>
    );
};
