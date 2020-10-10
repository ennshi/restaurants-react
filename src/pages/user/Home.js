import React, {useEffect, useState} from "react";
import RestaurantSearchForm from "../../components/RestaurantSearchForm";
import fetchData from "../../helpers/fetchData";
import RestaurantList from "../../components/RestaurantList";
import FeaturedRestaurants from "../../components/FeaturedRestaurants";

export default () => {
    const [errors, setErrors] = useState(null);
    const [restaurants, setRestaurants] = useState(null);
    const [featuredRestaurants, setFeaturedRestaurants] = useState(null);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('name::asc');
    const fetchRestaurants = async ({type}) => {
        const query = type === 'featured' ? 'filter=featured::true' : `filter=${filter}&sort=${sort}`;
        const fetchedData = await fetchData(`http://localhost:8080/restaurant?${query}`, {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });
        if (fetchedData.errors.length) {
            return setErrors(fetchedData.errors);
        }
        if (type === 'featured') {
            return setFeaturedRestaurants(fetchedData.response);
        }
        setRestaurants(fetchedData.response);
    };
    useEffect(() => {
        fetchRestaurants({type: 'featured'});
    }, []);
    useEffect(() => {
        if(filter) {
            fetchRestaurants({type: 'searchResults'});
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
            {featuredRestaurants ?
                <FeaturedRestaurants restaurants={featuredRestaurants} /> :
                null}
        </>
    );
};
