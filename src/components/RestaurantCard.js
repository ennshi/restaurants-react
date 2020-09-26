import React from 'react';
import './RestaurantCard.css';
import {convertUrl} from "../helpers/pathConverters";
import {Link} from 'react-router-dom';

export default ({restaurant}) => {
    console.log(restaurant);
    return (
        <div className="restaurant-card__container">
            <Link to={`http://localhost:8080/restaurant/${restaurant._id}`}>
                <img src={convertUrl(restaurant.photoUrl)} className="restaurant-card__photo" />
                <h4 className="restaurant-card__header">{restaurant.name}</h4>
                <p className="restaurant-card__text">{restaurant.location.formattedAddress}</p>
                <div className="restaurant-card__rating-block">
                    <span className="restaurant-card__rating"><i className="fas fa-asterisk"></i>{restaurant.avgRating ? `${restaurant.avgRating}/5` : '-/5'}</span>
                    <span className="restaurant-card__reviews">{restaurant.reviews.length} reviews</span>
                </div>
            </Link>
        </div>
    );
};
