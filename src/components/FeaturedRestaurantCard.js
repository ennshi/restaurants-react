import React, {useState} from 'react';
import './FeaturedRestaurantCard.css';
import {convertUrl} from "../helpers/pathConverters";
import {Link} from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default ({restaurant}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const isImgLoaded = () => {
        setImgLoaded(true);
    };
    return (
        <div className="featured-restaurant-card__container">
            <Link to={`restaurant/${restaurant._id}`}>
                {!imgLoaded &&
                <div className="featured-restaurant-card__photo" style={{margin: '0 auto'}}>
                    <Skeleton height="16rem"/>
                </div>
                }
                <img src={convertUrl(restaurant.photoUrl)} className={imgLoaded ? 'featured-restaurant-card__photo' : 'featured-restaurant-card__photo hidden'} alt={restaurant.name} onLoad={isImgLoaded}/>
                <span className="featured-restaurant-card__rating"><i className="fas fa-asterisk"></i>{restaurant.avgRating ? `${restaurant.avgRating.toFixed(1)}/5` : '-/5'}</span>
                <h4 className="featured-restaurant-card__header">{restaurant.name}</h4>
                <p className="featured-restaurant-card__country">{restaurant.location.formattedAddress.split(',').slice(-1)}</p>
            </Link>
        </div>
    );
};
