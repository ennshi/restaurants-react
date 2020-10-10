import React from 'react';
import './FeaturedRestaurantCard.css';
import {convertUrl} from "../helpers/pathConverters";
import {Link} from "react-router-dom";

export default ({restaurant}) => {
    return (
        <div className="featured-restaurant-card__container">
            <Link to={`restaurant/${restaurant._id}`}>
                <img src={convertUrl(restaurant.photoUrl)} className="featured-restaurant-card__photo" alt={restaurant.name}/>
                <span className="featured-restaurant-card__rating"><i className="fas fa-asterisk"></i>{restaurant.avgRating ? `${restaurant.avgRating.toFixed(1)}/5` : '-/5'}</span>
                <h4 className="featured-restaurant-card__header">{restaurant.name}</h4>
                <p className="featured-restaurant-card__country">{restaurant.location.formattedAddress.split(',').slice(-1)}</p>
            </Link>
        </div>
    );
};
