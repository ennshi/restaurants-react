import React from "react";
import RestaurantSearchForm from "../../components/RestaurantSearchForm";
import fetchData from "../../helpers/fetchData";

export default () => {
    const searchHandler = async (values) => {
        const fetchedData = await fetchData(`http://localhost:8080/restaurant?filter=${values.filter}`, {
            crossDomain: true,
            method: 'GET',
            headers: {
                'Content-Type':'application/json'
            }
        });
        console.log(fetchedData.response);
    };
    return (
        <>
            <RestaurantSearchForm submitHandler={searchHandler}/>
            <h1>Restaurant List</h1>
        </>
    );
};
