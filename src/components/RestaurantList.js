import React from "react";
import RestaurantCard from "./RestaurantCard";
import './RestaurantList.css';
import Sorting from "./Sorting";

export default ({restaurants, sort, sortHandler}) => {
    return (
        <>
            <header>
                <h2>Search Results</h2>
            </header>
            <Sorting
                name="filter"
                options={[
                    {title: 'By Rating', value: 'avgRating::desc'},
                    {title: 'From Newest', value: 'createdAt::desc'},
                    {title: 'By Name', value: 'name::asc'}
                ]}
                initialValue={sort}
                classes="sorting__container--100 sorting__container--light"
                sortHandler={sortHandler}
            />
            <div className="restaurant-list__container">
                {restaurants.length ?
                    restaurants.map((restaurant, i) => <RestaurantCard restaurant={restaurant} key={i}/>) :
                    <h4>No Restaurants Found</h4>
                }
            </div>
        </>
    )
};
