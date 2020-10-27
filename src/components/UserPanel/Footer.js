import React from 'react';
import {Link} from 'react-router-dom';
import './Footer.css';

export default () => {
    return (
        <footer className="footer__container">
            <div className="footer__copyright-block">
                <img className="footer__logo" src={process.env.PUBLIC_URL + '/logo192.png'} alt="WhereToEat"/>
                <span className="footer__copyright-text"><i className="far fa-copyright"></i> WhereToEat</span>
            </div>
            <ul className="footer__item-list">
                <li className="footer__item">
                    <Link to="about">About</Link>
                </li>
                <li className="footer__item">
                    <Link to="terms-and-policies">Terms And Policies</Link>
                </li>
                <li className="footer__item">
                    <Link to="contact">Contact</Link>
                </li>
            </ul>
            <div className="footer__social-media-list">
                <a href="/" className="footer__social-media-item"><i className="fab fa-facebook"></i></a>
                <a href="/" className="footer__social-media-item"><i className="fab fa-telegram"></i></a>
            </div>
        </footer>
    );
};
