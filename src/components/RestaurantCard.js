import React from 'react';
import './RestaurantCard.css';
import {convertUrl} from "../helpers/pathConverters";
import {Link} from 'react-router-dom';
import Image from "./Image";

export default ({restaurant}) => {
    return (
        <div className="restaurant-card__container">
            <Link to={`restaurant/${restaurant._id}`}>
                <Image alt={restaurant.name} url={convertUrl(restaurant.photoUrl)} classes="restaurant-card__photo"/>
                <h4 className="restaurant-card__header">{restaurant.name}</h4>
                <p className="restaurant-card__text">{restaurant.location.formattedAddress}</p>
                <div className="restaurant-card__rating-block">
                    <span className="restaurant-card__rating"><i className="fas fa-asterisk"></i>{restaurant.avgRating ? `${restaurant.avgRating.toFixed(1)}/5` : '-/5'}</span>
                    <span className="restaurant-card__reviews">{restaurant.reviews.length} reviews</span>
                </div>
            </Link>
        </div>
    );
};
