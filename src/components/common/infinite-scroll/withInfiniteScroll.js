import React, {useEffect, useRef, useState} from 'react';
import fetchData from "../../../helpers/fetchData";

export const withInfiniteScroll = WrappedComponent => {
    return (props) => {
        const [items, setItems] = useState(null);
        const [itemErrors, setItemErrors] = useState(null);
        const page = useRef(1);
        const [nextItems, setNextItems] = useState(true);
        const [totalNumber, setTotalNumber] = useState(null);
        const isFetching = useRef(false);
        const fetchItems = async (url, itemsType) => {
            isFetching.current = true;
            const fetchedData = await fetchData({
                url: `${url}&page=${page.current}`,
                method: 'GET'
            });
            isFetching.current = false;
            if (!fetchedData.errors.length) {
                page.current++;
                !totalNumber && setTotalNumber(fetchedData.response.totalNumber);
                return setItems(prevVal => prevVal ?
                    [...prevVal, ...fetchedData.response[itemsType]] :
                    fetchedData.response[itemsType]);
            }
            setItemErrors(fetchedData.errors);
        };
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
                itemErrors={itemErrors}
                fetchItems={fetchItems}
            />;
    }
};
