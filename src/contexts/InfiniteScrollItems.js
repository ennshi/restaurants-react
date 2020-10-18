import React, {useEffect, useRef, useState} from 'react';

export const InfiniteScrollItemsContext = React.createContext({});

export const InfiniteScrollItemsProvider = (props) => {
    const [items, setItems] = useState(null);
    const page = useRef(1);
    const [nextItems, setNextItems] = useState(true);
    const [totalNumber, setTotalNumber] = useState(null);
    const isFetching = useRef(false);
    useEffect(() => {
        if(items) {
            setNextItems(totalNumber > items.length);
        }
    }, [items]);
    return (
        <InfiniteScrollItemsContext.Provider value={{
            items,
            setItems,
            page,
            nextItems,
            setNextItems,
            totalNumber,
            setTotalNumber,
            isFetching
        }}>
            {props.children}
        </InfiniteScrollItemsContext.Provider>
    );
}
