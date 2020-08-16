import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import Restaurant from './Restaurant';
import RestaurantList from './RestaurantList';
import SignUp from "./SignUp";

export default () => {
    return (
        <>
            <h1>UserPanel</h1>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/profile' component={Profile} />
                <Route path='/login' component={Login} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/restaurants/:restaurantId' component={Restaurant} />
                <Route path='/restaurants' component={RestaurantList} />
            </Switch>
        </>
    );
};
