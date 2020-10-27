import React, {useState} from 'react';
import Skeleton from 'react-loading-skeleton';

export default ({classes, alt, url, width, height}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const isLoaded = () => {
        setImgLoaded(true);
    };
    return (
        <>
            {!imgLoaded && <Skeleton width={width} height={height} />}
            <img src={url} onLoad={isLoaded} alt={alt} className={imgLoaded ? classes : `${classes} hidden`}/>
        </>
    )
};
