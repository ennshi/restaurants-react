import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import fetchData from "../../helpers/fetchData";
import {convertUrl} from "../../helpers/pathConverters";
import './Restaurant.css';
import Map from "../../components/Map";

export default () => {
    const {restaurantId} = useParams();
    const [errors, setErrors] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    useEffect(() => {
        const fetchingRestaurant = async () => {
            const fetchedData = await fetchData(`http://localhost:8080/restaurant/${restaurantId}`, {
                crossDomain: true,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!fetchedData.errors.length) {
                console.log(fetchedData.response);
                return setRestaurant({...fetchedData.response.restaurant, ...fetchedData.response.reviewsStat});
            }
            setErrors(fetchedData.errors);
        };
        fetchingRestaurant();
    }, []);
    return ( restaurant ?
            <main className="restaurant__container">
                <header className="restaurant__header">
                    <h1>{restaurant.name}</h1>
                </header>
                <div className="restaurant__body">
                    <img src={convertUrl(restaurant.photoUrl)} className="restaurant__image" alt="restaurant"/>
                    <div className="restaurant__description">
                        {restaurant.description}
                    </div>
                    <div className="restaurant__additional-info">
                        <div className="restaurant__stat">
                            <span className="restaurant__rating"><i className="fas fa-asterisk"></i>{restaurant.numReviews ? restaurant.rating : '-'}/5</span>
                            <span className="restaurant__reviews">{restaurant.numReviews} reviews</span>
                        </div>
                        <div className="restaurant__map-block">
                            <Map lat={restaurant.location.coordinates[1]} lng={restaurant.location.coordinates[0]}/>
                            <a href={`http://maps.google.com/maps/place/${restaurant.location.coordinates[1]},${restaurant.location.coordinates[0]}`} target="_blank">{restaurant.location.formattedAddress}</a>
                        </div>
                    </div>
                </div>
            </main> : ''
    );
};
