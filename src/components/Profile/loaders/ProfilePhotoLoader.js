import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default ({imgSize}) => {
    return (
        <div className="profile-photo__container">
            <Skeleton width={imgSize} height={imgSize} />
            <div style={{margin: '1rem'}}>
                <Skeleton width={imgSize} height='1.8rem' />
            </div>
        </div>
    );
}
