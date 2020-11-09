import React, {useEffect, useState} from 'react';
import RestaurantSearchForm from '../../components/Home/RestaurantSearchForm';
import RestaurantList from '../../components/Home/RestaurantList';
import FeaturedRestaurants from '../../components/Home/FeaturedRestaurants';
import {RESTAURANT_URL} from '../../constants/urls';
import useFetchDataDidMount from "../../hooks/useFetchDataDidMount";
import useInfiniteScroll from "../../hooks/infinite-scroll/useInfiniteScroll";
import RestaurantListLoader from "../../components/Home/loaders/RestaurantListLoader";

const Home = () => {
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('avgRating::desc');
    const [restaurantsUrl, setRestaurantsUrl] = useState('');
    const {
        items: restaurants,
        totalNumber: totalNumberRestaurants,
        itemErrors: searchErrors,
        resetItems,
        LoadingComponent
    } = useInfiniteScroll(restaurantsUrl, 'restaurants');
    const [featuredRestaurants, featuredErrors] = useFetchDataDidMount({
        url: `${RESTAURANT_URL}?filter=featured::true`,
        initialValue: [],
        itemType: 'restaurants'
    });
    useEffect(() => {
        if(sort && filter) {
            restaurants && resetItems();
            setRestaurantsUrl(`${RESTAURANT_URL}?filter=${filter}&sort=${sort}`);
        }
    }, [sort, filter]);
    const searchHandler = (value) => {
        setFilter(value.filter);
    };
    const sortHandler = (value) => {
        setSort(value);
    };
    return (
        <main>
            <RestaurantSearchForm submitHandler={searchHandler} errors={featuredErrors || searchErrors}/>
            {filter &&
                <>
                    <RestaurantList restaurants={restaurants} sort={sort} sortHandler={sortHandler} totalNumber={totalNumberRestaurants}/>
                    <LoadingComponent loader={RestaurantListLoader}/>
                </>
            }
            <FeaturedRestaurants restaurants={featuredRestaurants} />
        </main>
    );
};

export default Home;
