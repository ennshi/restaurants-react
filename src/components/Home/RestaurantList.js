import React from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css';
import Sorting from '../common/Sorting';

export default ({restaurants, sort, sortHandler, totalNumber}) => {
    return (
        <>
            <header className="heading__container heading__container--light">
                <h1 className="heading">Search Results</h1>
            </header>
            {(restaurants && restaurants.length) ?
                <div className="sorting__container--100">
                    <span className="text--small-blue">{totalNumber} restaurants</span>
                    <Sorting
                        name="filter"
                        options={[
                            {title: 'By Rating', value: 'avgRating::desc'},
                            {title: 'From Newest', value: 'createdAt::desc'},
                            {title: 'By Name', value: 'name::asc'}
                        ]}
                        initialValue={sort}
                        sortHandler={sortHandler}
                    />
                </div> : ''
            }
            <div className="restaurant-list__container">
                {restaurants ?
                    (restaurants.length ?
                        restaurants.map((restaurant, i) => <RestaurantCard restaurant={restaurant} key={i}/>) :
                        <h4>No Restaurants Found</h4>) :
                    null
                }
            </div>
        </>
    )
};
