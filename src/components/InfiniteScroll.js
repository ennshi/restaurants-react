import React, {useCallback, useEffect, useRef} from 'react';
import ReviewListLoader from "./loaders/ReviewListLoader";
import RestaurantListLoader from "./loaders/RestaurantListLoader";

export default ({fetchItems, type, isFetching, nextItems}) => {
    const loader = useRef(null);
    const loadMore = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && nextItems) {
            !isFetching.current && fetchItems()
        }
    }, [isFetching.current, nextItems]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver(loadMore, options);
        if (loader && loader.current) {
            observer.observe(loader.current);
        }
        return () => observer.unobserve(loader.current);
    }, [loader, loadMore]);
        return (
            <div ref={loader} style={{width: '100%'}}>
                {nextItems && type === 'reviews' && <ReviewListLoader/>}
                {nextItems && type === 'restaurants' && <RestaurantListLoader/>}
            </div>
        );
};
