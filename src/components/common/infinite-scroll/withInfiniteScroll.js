import React, {useEffect, useRef, useState} from 'react';

export const withInfiniteScroll = WrappedComponent => {
    return (props) => {
        const [items, setItems] = useState(null);
        const page = useRef(1);
        const [nextItems, setNextItems] = useState(true);
        const [totalNumber, setTotalNumber] = useState(null);
        const isFetching = useRef(false);
        
        useEffect(() => {
            items && setNextItems(totalNumber > items.length);
        }, [items]);
        return <WrappedComponent
                {...props}
                items={items}
                setItems={setItems}
                page={page}
                nextItems={nextItems}
                setNextItems={setNextItems}
                totalNumber={totalNumber}
                setTotalNumber={setTotalNumber}
                isFetching={isFetching}
            />;
    }
};
