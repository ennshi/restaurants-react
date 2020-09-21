import React, {useState} from 'react';
import './Review.css';
import {dateConverter} from "../helpers/dateConverters";
import ReadMore from "./ReadMore";

export default (props) => {
    const {type, review} = props;
    const [displayActions, setDisplayActions] = useState(false);
    const toggleActions = () => {
        setDisplayActions(!displayActions);
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
                            <span>{review.rating}/5</span>
                            <span className="review__date">{dateConverter(review.updatedAt)}</span>
                        </div>
                        <button onClick={toggleActions} className="btn--arrow">{displayActions ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}</button>
                    </div>
                    <div className="review__text"><ReadMore text={review.text} numChar={100} readMoreText={'Read More'} /></div>
                    {displayActions ?
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
