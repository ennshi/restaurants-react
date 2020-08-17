import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Navbar.css';

export default (props) => {
    const currentRoute = useHistory().location.pathname.toLowerCase();
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to={'/'}>WhereToEat</Link>
            </div>
            <div className="navbar__spacer"></div>
            <button onClick={props.toggleMenu} className="navbar__menu-btn">
                {props.menuDisplayed ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </button>
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
