import React from "react";
import RestaurantCard from "./RestaurantCard";
import './RestaurantList.css';

export default ({restaurants}) => {
    return (
        <>
            <header>
                <h2>Search Results</h2>
            </header>
            <div className="restaurant-list__container">
                {restaurants.length ?
                    restaurants.map((restaurant, i) => <RestaurantCard restaurant={restaurant} key={i}/>) :
                    <h4>No Restaurants Found</h4>
                }
            </div>
        </>
    )
};
