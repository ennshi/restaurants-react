import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default ({inputWidth}) => {
    return (
        <div className="form__body--light">
            {Array(5).fill(1).map((el, i) => (
                <div style={{margin: '1rem'}} key={i}>
                    <Skeleton height="1.8rem" width={inputWidth}/>
                </div>
            ))}
        </div>
    );
}
