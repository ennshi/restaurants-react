import React, {useState} from 'react';
import './FeaturedRestaurantCard.css';
import {convertUrl} from "../helpers/pathConverters";
import {Link} from "react-router-dom";
import Image from "./Image";

export default ({restaurant}) => {
    return (
        <div className="featured-restaurant-card__container">
            <Link to={`restaurant/${restaurant._id}`} target="_blank" rel="noreferrer noopener">
                <Image height="16rem" url={convertUrl(restaurant.photoUrl)} alt={restaurant.name} classes="featured-restaurant-card__photo" width="12rem" />
                <span className="featured-restaurant-card__rating"><i className="fas fa-asterisk"></i>{restaurant.avgRating ? `${restaurant.avgRating.toFixed(1)}/5` : '-/5'}</span>
                <h4 className="featured-restaurant-card__header">{restaurant.name}</h4>
                <p className="featured-restaurant-card__country">{restaurant.location.formattedAddress.split(',').slice(-1)}</p>
            </Link>
        </div>
    );
};
