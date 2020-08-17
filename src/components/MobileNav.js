import React from 'react';
import ReactDOM from 'react-dom';

import './MobileNav.css';
import {Link} from "react-router-dom";

export default (props) => {
    return ReactDOM.createPortal(
        <div className="side-drawer" onClick={props.toggleMenu}>
            <ul className="side-drawer__item-list">
                <li className="side-drawer__item">
                    <Link to={'/'}>Restaurants</Link>
                </li>
                <li className="side-drawer__item">
                    <Link to={'/profile'}>Profile</Link>
                </li>
                <li className="side-drawer__item">
                    <Link to={'/login'}>Login</Link>
                </li>
            </ul>
        </div>,
    document.getElementById('modal-root'));
};
