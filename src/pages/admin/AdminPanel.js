import React from "react";
import {Switch, Route} from "react-router-dom";

import AdminMenu from "./AdminMenu";
import AdminAddRestaurant from "./AdminAddRestaurant";
import AdminRestaurant from "./AdminRestaurant";
import AdminRestaurants from "./AdminRestaurants";
import AdminReviews from "./AdminReviews";
import AdminUsers from "./AdminUsers";

import AdminLogin from "./AdminLogin";
export default () => {
    return (
        <>
            <h1>AdminPanel</h1>
            <Switch>
               <Route path='/admin/login' component={AdminLogin}/>
               <Route path='/admin/menu' component={AdminMenu}/>
               <Route path='/admin/add-restaurant' component={AdminAddRestaurant}/>
               <Route path='/admin/restaurants/:restaurantId' component={AdminRestaurant}/>
               <Route path='/admin/restaurants' component={AdminRestaurants}/>
               <Route path='/admin/users' component={AdminUsers}/>
               <Route path='/admin/reviews' component={AdminReviews}/>
            </Switch>
        </>
    );
};
