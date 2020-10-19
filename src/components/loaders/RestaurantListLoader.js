import React, {useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import '../RestaurantList.css'

export default () => {
    const size = '22rem';
    return (
        <div className="restaurant-list__container">
            {Array(4).fill(1).map((el, i) => (
                <div key={i} style={{width: size, margin: '1rem'}}>
                    <Skeleton width={size} height={'12rem'}/>
                    <div style={{padding: '0.4rem 0'}}>
                        <Skeleton width={size} height={'1.8rem'}/>
                    </div>
                </div>
                ))}
        </div>
    );
};
