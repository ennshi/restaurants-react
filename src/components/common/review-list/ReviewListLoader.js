import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './ReviewList.css';

export default () => {
    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            {Array(5).fill(1).map((el, i) => (
                <div style={{padding: '0 3vw 1rem 3vw', width: '100%', boxSizing: 'border-box'}} key={i}>
                    <Skeleton height={'0.7rem'} count={4}/>
                </div>
            ))}
        </div>
    );
};
