import React from 'react';
import '../FeaturedRestaurantCard.css'
import Skeleton from "react-loading-skeleton";

export default () => {
    return (Array(4).fill(1).map((el, i) => (
        <div className="featured-restaurant-card__container" key={i}>
            <div style={{padding: '0 1rem 1rem 1rem'}}>
                <Skeleton height="16rem" width="12rem"/>
                <div className="featured-restaurant-card__header">
                    <Skeleton height="1.8rem" width="12rem"/>
                </div>
            </div>
        </div>
        )
    ))
};
