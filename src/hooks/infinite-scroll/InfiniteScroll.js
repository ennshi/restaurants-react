import React, {useCallback, useEffect, useRef} from 'react';

export default ({fetchItems, isFetching, nextItems, loader}) => {
    const loaderWrapper = useRef(null);
    const loadMore = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && nextItems) {
            !isFetching.current && fetchItems()
        }
    }, [isFetching.current, nextItems]);

    useEffect(() => {
        const loaderEl = loaderWrapper.current;
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        const observer = new IntersectionObserver(loadMore, options);
        if (loaderEl) {
            observer.observe(loaderEl);
        }
        if(!nextItems) {
            observer.unobserve(loaderEl);
        }
        return () => observer.unobserve(loaderEl);
    }, [loadMore]);
        return (
            <div ref={loaderWrapper} style={{width: '100%'}}>
                {nextItems && loader()}
            </div>
        );
};
