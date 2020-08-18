import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";

import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import Restaurant from './Restaurant';
import RestaurantList from './RestaurantList';
import SignUp from "./SignUp";
import Navbar from "../../components/Navbar";
import MobileNav from "../../components/MobileNav";


export default () => {
    const [menuDisplayed, setMenuDisplay] = useState(false);
    const toggleMenu = () => {
        setMenuDisplay(!menuDisplayed);
    };
    const mobileNavigation = menuDisplayed? <MobileNav toggleMenu={toggleMenu}/> : '';
    return (
        <>
            <Navbar toggleMenu={toggleMenu} menuDisplayed={menuDisplayed}/>
            {mobileNavigation}
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