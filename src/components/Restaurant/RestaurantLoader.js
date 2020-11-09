import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './Restaurant.css';

export default ({width}) => {
    return (
        <div>
            <div className="heading__container" style={{height: '3.5rem'}}>
            </div>
            <div className="restaurant__body">
                <div className="restaurant__image">
                    <Skeleton width={width} height="50vh"/>
                </div>
                <div style={{textAlign: 'center', margin: '1rem 0', display: 'flex', flexDirection: 'column'}}>
                    {Array(3).fill(1).map((el, i) => (
                        <Skeleton width={width} height="1rem" key={i} />
                    ))}
                </div>
                <div className="restaurant__additional-info">
                    <div className="restaurant__stat">
                        <div className="restaurant__stat">
                            <Skeleton height="2.5rem"/>
                            <div style={{marginTop: '0.5rem'}}>
                                <Skeleton height="2rem"/>
                            </div>
                        </div>
                    </div>
                    <div className="restaurant__map-block">
                        <Skeleton width="24rem" height="10rem"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
