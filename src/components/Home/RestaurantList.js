import React from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css';
import Sorting from '../common/Sorting';
import InfoMessage from "../common/InfoMessage";
import Header from "../common/Header";

export default ({restaurants, sort, sortHandler, totalNumber}) => {
    return (
        <section>
            <Header title="Search Results" level={2} classContainer="light" classHeading="large"/>
            {(restaurants && restaurants.length) ?
                <section className="sorting__container--100">
                    <span className="text--small-blue">{totalNumber} restaurants</span>
                    <Sorting
                        name="filter"
                        options={[
                            {title: 'By Rating', value: 'avgRating::desc'},
                            {title: 'By Newest', value: 'createdAt::desc'},
                            {title: 'By Name', value: 'name::asc'}
                        ]}
                        initialValue={sort}
                        sortHandler={sortHandler}
                    />
                </section> : ''
            }
            <section className="restaurant-list__container">
                {restaurants ?
                    (restaurants.length ?
                        restaurants.map((restaurant, i) => <RestaurantCard restaurant={restaurant} key={i}/>) :
                        <InfoMessage message="No Restaurants Found" />) :
                    null
                }
            </section>
        </section>
    )
};
