import React from 'react';
import './RestaurantCard.css';
import {convertUrl} from "../helpers/pathConverters";

export default ({restaurant}) => {
    console.log(restaurant);
    return (
        <div className="restaurant-card__container">
            <img src={convertUrl(restaurant.photoUrl)} className="restaurant-card__photo" />
            <h4>{restaurant.name}</h4>
            <p>{restaurant.location.formattedAddress}</p>
            <div className="restaurant-card__rating-block">
                <span>{restaurant.avgRating ? `${restaurant.avgRating}/5` : '-/5'}</span>
                <span>{restaurant.reviews.length} reviews</span>
            </div>
        </div>
    );
};
