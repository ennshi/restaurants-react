import React from 'react';
import FeaturedRestaurantCard from "./FeaturedRestaurantCard";
import './FeaturedRestaurants.css';

export default ({restaurants}) => {
    return (
        <>
        <header>
            <h2>Featured This Month</h2>
        </header>
        <div className="featured-restaurants__container">
            {restaurants.map((restaurant, i) => <FeaturedRestaurantCard restaurant={restaurant} key={i}/>)}
        </div>
        </>
    );
}
