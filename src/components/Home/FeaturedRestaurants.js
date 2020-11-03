import React from 'react';
import FeaturedRestaurantCard from './FeaturedRestaurantCard';
import './FeaturedRestaurants.css';
import FeaturedRestaurantListLoader from "./loaders/FeaturedRestaurantListLoader";

export default ({restaurants}) => {
    return (
        <section className="featured-restaurants__wrapper">
            <header className="heading__container heading__container--accent heading__container--featured">
                <div className="heading__wrapper--featured">
                    <h2 className="heading--larger">Featured This Month</h2>
                </div>
            </header>
            <div className="featured-restaurants__container">
                {restaurants.length ?
                    restaurants.map((restaurant, i) => <FeaturedRestaurantCard restaurant={restaurant} key={i}/>) :
                    <FeaturedRestaurantListLoader />
                }
            </div>
        </section>
    );
}
