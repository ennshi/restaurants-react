import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Navbar.css';

export default () => {
    const currentRoute = useHistory().location.pathname.toLowerCase();
    console.log(currentRoute);
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to={'/'}>WhereToEat</Link>
            </div>
            <div className="navbar__spacer"></div>
            <ul className="navbar__item-list">
                <li className={currentRoute === '/' ? "navbar__item--active" : "navbar__item"}>
                    <Link to={'/'}>Find Restaurant</Link>
                </li>
                <li className={currentRoute === '/profile' ? "navbar__item--active" : "navbar__item"}>
                    <Link to={'/profile'}>Profile</Link>
                </li>
                <li className={currentRoute === '/login' ? "navbar__item--active" : "navbar__item"}>
                    <Link to={'/login'}>Login</Link>
                </li>
            </ul>
        </nav>
    );
};
