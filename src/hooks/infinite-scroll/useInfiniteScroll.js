import React, {useEffect, useRef, useState} from 'react';
import fetchData from "../../helpers/fetchData";
import InfiniteScroll from "./InfiniteScroll";

export default (urlToFetch, itemsType) => {
    const [items, setItems] = useState(null);
    const [itemErrors, setItemErrors] = useState(null);
    const page = useRef(1);
    const [nextItems, setNextItems] = useState(true);
    const [totalNumber, setTotalNumber] = useState(null);
    const isFetching = useRef(false);

    const fetchItems = async () => {
        if(urlToFetch) {
            isFetching.current = true;
            const fetchedData = await fetchData({
                url: `${urlToFetch}&page=${page.current}`,
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
        }
    };
    const resetItems = () => {
        setNextItems(false);
        if(items) {
            setTotalNumber(null);
            setItems(null);
            page.current = 1;
        }
        setNextItems(true);
    };
    useEffect(() => {
        if(nextItems) {
            items && setNextItems(totalNumber > items.length);
        }
    }, [items]);
    const LoadingComponent = ({loader}) => {
        return(
            <InfiniteScroll isFetching={isFetching} nextItems={nextItems} fetchItems={fetchItems} loader={loader} />
        );
    };
    return {
        items,
        setItems,
        totalNumber,
        setTotalNumber,
        itemErrors,
        resetItems,
        LoadingComponent
    };
};
