import React, {useCallback, useContext, useEffect, useRef} from 'react';
import {InfiniteScrollItemsContext} from "../contexts/InfiniteScrollItems";

export default ({fetchItems}) => {
    const loader = useRef(null);
    const {isFetching, nextItems} = useContext(InfiniteScrollItemsContext);
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
            threshold: 0.25
        };
        const observer = new IntersectionObserver(loadMore, options);
        if (loader && loader.current) {
            observer.observe(loader.current);
        }
        return () => observer.unobserve(loader.current);
    }, [loader, loadMore]);
        return (
            <div ref={loader}>{nextItems && 'Loading'}</div>
        );
};
