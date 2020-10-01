import React, {useEffect, useState} from "react";
import RestaurantSearchForm from "../../components/RestaurantSearchForm";
import fetchData from "../../helpers/fetchData";
import RestaurantList from "../../components/RestaurantList";

export default () => {
    const [errors, setErrors] = useState(null);
    const [restaurants, setRestaurants] = useState(null);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('name::asc');
    const fetchRestaurants = async () => {
        const fetchedData = await fetchData(`http://localhost:8080/restaurant?filter=${filter}&sort=${sort}`, {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });
        if (fetchedData.errors.length) {
            return setErrors(fetchedData.errors);
        }
        setRestaurants(fetchedData.response);
    };
    useEffect(() => {
        if(filter) {
            fetchRestaurants();
        }
    }, [filter, sort]);
    const searchHandler = (value) => {
        setFilter(value.filter);
    };
    const sortHandler = (value) => {
        setSort(value);
    };
    return (
        <>
            <RestaurantSearchForm submitHandler={searchHandler} errors={errors}/>
            {restaurants ?
                <RestaurantList restaurants={restaurants} sort={sort} sortHandler={sortHandler}/> :
                null}
        </>
    );
};
