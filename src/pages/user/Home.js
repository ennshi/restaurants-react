import React, {useEffect, useState} from 'react';
import RestaurantSearchForm from '../../components/Home/RestaurantSearchForm';
import fetchData from '../../helpers/fetchData';
import RestaurantList from '../../components/Home/RestaurantList';
import FeaturedRestaurants from '../../components/Home/FeaturedRestaurants';
import InfiniteScroll from '../../components/common/infinite-scroll/InfiniteScroll';
import {withInfiniteScroll} from '../../components/common/infinite-scroll/withInfiniteScroll';
import {RESTAURANT_URL} from '../../constants/urls';

const Home = (props) => {
    const [errors, setErrors] = useState(null);
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
        nextItems
    } = props;
    const fetchRestaurants = async ({type}) => {
        if (type === 'searchResults') {
            isFetchingRestaurants.current = true;
        }
        const query = type === 'featured' ? 'filter=featured::true' : `filter=${filter}&sort=${sort}&page=${page.current}`;
        const fetchedData = await fetchData({
            url: `${RESTAURANT_URL}?${query}`,
            method: 'GET'
        });
        isFetchingRestaurants.current = false;
        if (fetchedData.errors.length) {
            return setErrors(fetchedData.errors);
        }
        if (type === 'featured') {
            return setFeaturedRestaurants(fetchedData.response.restaurants);
        }
        !totalNumberRestaurants && setTotalNumberRestaurants(fetchedData.response.totalNumber);
        page.current++;
        setRestaurants(prevState => prevState ? [...prevState, ...fetchedData.response.restaurants] : fetchedData.response.restaurants);
    };
    useEffect(() => {
        fetchRestaurants({type: 'featured'});
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
            <RestaurantSearchForm submitHandler={searchHandler} errors={errors}/>
            {filter &&
                <>
                    <RestaurantList restaurants={restaurants} sort={sort} sortHandler={sortHandler} totalNumber={totalNumberRestaurants}/>
                    <InfiniteScroll fetchItems={() => fetchRestaurants('searchResults')} type="restaurants" isFetching={isFetchingRestaurants} nextItems={nextItems}/>
                </>
            }
            <FeaturedRestaurants restaurants={featuredRestaurants} />
        </main>
    );
};

export default withInfiniteScroll(Home);
