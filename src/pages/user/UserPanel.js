import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import Restaurant from './Restaurant';
import SignUp from './SignUp';
import Navbar from '../../components/UserPanel/Navbar';
import MobileNav from '../../components/UserPanel/MobileNav';
import {UserAuthProvider} from '../../contexts/UserAuth';
import Footer from '../../components/UserPanel/Footer';
import NotFound from './NotFound';

export default () => {
    const [menuDisplayed, setMenuDisplay] = useState(false);
    const toggleMenu = () => {
        setMenuDisplay(!menuDisplayed);
    };
    const mobileNavigation = menuDisplayed ? <MobileNav toggleMenu={toggleMenu}/> : '';
    return (
        <UserAuthProvider>
            <Navbar toggleMenu={toggleMenu} menuDisplayed={menuDisplayed}/>
            {mobileNavigation}
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/profile' component={Profile} />
                <Route path='/login' component={Login} />
                <Route path='/sign-up' component={SignUp} />
                <Route path='/restaurant/:restaurantId' component={Restaurant} />
                <Route component={NotFound} />
            </Switch>
            <Footer/>
        </UserAuthProvider>
    );
};
