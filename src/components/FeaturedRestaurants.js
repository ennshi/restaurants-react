import React from 'react';
import FeaturedRestaurantCard from "./FeaturedRestaurantCard";
import './FeaturedRestaurants.css';

export default ({restaurants}) => {
    return (
        <div className="featured-restaurants__wrapper">
            <header className="heading__container heading__container--accent heading__container--featured">
                <div className="heading__wrapper--featured">
                    <h1 className="heading">Featured This Month</h1>
                </div>
            </header>
            <div className="featured-restaurants__container">
                {restaurants.map((restaurant, i) => <FeaturedRestaurantCard restaurant={restaurant} key={i}/>)}
            </div>
        </div>
    );
}
