import React, {useState} from "react";
import RestaurantSearchForm from "../../components/RestaurantSearchForm";
import fetchData from "../../helpers/fetchData";
import RestaurantList from "../../components/RestaurantList";

export default () => {
    const [restaurants, setRestaurants] = useState(null);
    const searchHandler = async (values) => {
        const fetchedData = await fetchData(`http://localhost:8080/restaurant?filter=${values.filter}`, {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });
        setRestaurants(fetchedData.response);
    };
    return (
        <>
            <RestaurantSearchForm submitHandler={searchHandler}/>
            {restaurants ? <RestaurantList restaurants={restaurants} /> : null}
        </>
    );
};
