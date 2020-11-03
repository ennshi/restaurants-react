import React, {useEffect, useState} from 'react';
import RestaurantSearchForm from '../../components/Home/RestaurantSearchForm';
import RestaurantList from '../../components/Home/RestaurantList';
import FeaturedRestaurants from '../../components/Home/FeaturedRestaurants';
import InfiniteScroll from '../../components/common/infinite-scroll/InfiniteScroll';
import {withInfiniteScroll} from '../../components/common/infinite-scroll/withInfiniteScroll';
import {RESTAURANT_URL} from '../../constants/urls';
import useFetchDataDidMount from "../../hooks/useFetchDataDidMount";

const Home = (props) => {
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
    const [featuredRestaurants, featuredErrors] = useFetchDataDidMount({
        url: `${RESTAURANT_URL}?filter=featured::true`,
        initialValue: [],
        itemType: 'restaurants'
    });
    const restaurantsUrl = `${RESTAURANT_URL}?filter=${filter}&sort=${sort}`;
    const fetchRestaurants = () => (fetchItems(restaurantsUrl, 'restaurants'));
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
