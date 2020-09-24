import React, {useContext} from 'react';
import ReactDOM from 'react-dom';

import './MobileNav.css';
import {Link, useHistory} from "react-router-dom";
import {UserAuthContext} from "../contexts/UserAuth";

export default (props) => {
    const { isLoggedIn, handleLogout } = useContext(UserAuthContext);
    const history = useHistory();
    const onLogout = () => {
        handleLogout();
        history.push('/');
    };
    return ReactDOM.createPortal(
        <div className="side-drawer" onClick={props.toggleMenu}>
            <ul className="side-drawer__item-list">
                <li className="side-drawer__item">
                    <Link to={'/'}>Restaurants</Link>
                </li>
                { isLoggedIn ?
                    <li className="side-drawer__item">
                        <Link to={'/profile'}>Profile</Link>
                    </li> : ''
                }
                <li className="side-drawer__item">
                    { isLoggedIn ? <a href="/" onClick={onLogout}>Logout</a> : <Link to={'/login'}>Login</Link> }
                </li>
            </ul>
        </div>,
    document.getElementById('modal-root'));
};
