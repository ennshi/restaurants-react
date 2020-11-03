import React from 'react';
import {Link} from 'react-router-dom';
import './RestaurantCard.css';
import {convertUrl} from '../../helpers/pathConverters';
import Image from '../common/Image';

export default ({restaurant}) => {
    return (
        <article className="restaurant-card__container">
            <Link to={`restaurant/${restaurant._id}`} target="_blank" rel="noreferrer noopener">
                <Image alt={restaurant.name} url={convertUrl(restaurant.photoUrl)} classes="restaurant-card__photo" height="12rem"/>
                <h3 className="restaurant-card__header">{restaurant.name}</h3>
                <p className="restaurant-card__text">{restaurant.location.formattedAddress}</p>
                <div className="restaurant-card__rating-block">
                    <span className="restaurant-card__rating"><i className="fas fa-asterisk"></i>{restaurant.avgRating ? `${restaurant.avgRating.toFixed(1)}/5` : '-/5'}</span>
                    <span className="restaurant-card__reviews">{restaurant.reviews.length} reviews</span>
                </div>
            </Link>
        </article>
    );
};
