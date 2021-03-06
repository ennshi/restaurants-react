import React from 'react';
import {Link} from 'react-router-dom';
import './FeaturedRestaurantCard.css';
import convertUrl from '../../helpers/pathConverter';
import Image from '../common/Image';

export default ({restaurant}) => {
    return (
        <article className="featured-restaurant-card__container">
            <Link to={`restaurant/${restaurant._id}`} target="_blank" rel="noreferrer noopener">
                <Image height="16rem" url={convertUrl(restaurant.photoUrl)} alt={restaurant.name} classes="featured-restaurant-card__photo" width="12rem" />
                <span className="featured-restaurant-card__rating"><i className="fas fa-asterisk"></i>{restaurant.avgRating ? `${restaurant.avgRating.toFixed(1)}/5` : '-/5'}</span>
                <h3 className="featured-restaurant-card__header">{restaurant.name}</h3>
                <p className="featured-restaurant-card__country">{restaurant.location.formattedAddress.split(',').slice(-1)}</p>
            </Link>
        </article>
    );
};
