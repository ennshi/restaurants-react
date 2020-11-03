import React, {useEffect, useState} from 'react';
import RestaurantSearchForm from '../../components/Home/RestaurantSearchForm';
import fetchData from '../../helpers/fetchData';
import RestaurantList from '../../components/Home/RestaurantList';
import FeaturedRestaurants from '../../components/Home/FeaturedRestaurants';
import InfiniteScroll from '../../components/common/infinite-scroll/InfiniteScroll';
import {withInfiniteScroll} from '../../components/common/infinite-scroll/withInfiniteScroll';
import {RESTAURANT_URL} from '../../constants/urls';

const Home = (props) => {
    const [featuredErrors, setErrors] = useState(null);
    const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('avgRating::desc');
    const {
        items: restaurants,
        setItems: setRestaurants,
        setNextItems: setNextRestaurants,
        page,
        totalNumber: totalNumberRestaurants,
        setTotalNumber: setTotalNumberRestaurants,
        isFetching: isFetchingRestaurants,
        nextItems,
        fetchItems,
        itemErrors: searchErrors
    } = props;
    const restaurantsUrl = `${RESTAURANT_URL}?filter=${filter}&sort=${sort}`;
    const fetchRestaurants = () => (fetchItems(restaurantsUrl, 'restaurants'));
    const fetchFeaturedRestaurants = async () => {
        const fetchedData = await fetchData({
            url: `${RESTAURANT_URL}?filter=featured::true`,
            method: 'GET'
        });
        if (fetchedData.errors.length) {
            return setErrors(fetchedData.errors);
        }
        setFeaturedRestaurants(fetchedData.response.restaurants);
    };
    useEffect(() => {
        fetchFeaturedRestaurants();
    }, []);
    useEffect(() => {
        setNextRestaurants(true);
        if(restaurants) {
            setTotalNumberRestaurants(null);
            setRestaurants(prevState => null);
            page.current = 1;
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
                    <InfiniteScroll fetchItems={fetchRestaurants} type="restaurants" isFetching={isFetchingRestaurants} nextItems={nextItems}/>
                </>
            }
            <FeaturedRestaurants restaurants={featuredRestaurants} />
        </main>
    );
};

export default withInfiniteScroll(Home);
