import React, {useState} from 'react';

export const UserAuthContext = React.createContext({});

export const UserAuthProvider = (props) => {
    const [isLoggedIn, setLogIn] = useState(false);
    const [credentials, setCredetials] = useState({
        userId: '',
        expiration: 0,
        token: ''
    });
    const handleLogin = ({token, userId}) => {
        localStorage.clear();
        const expTime = Date.now() + 3600*1000;
        localStorage.setItem('token', token);
        localStorage.setItem('user', userId);
        localStorage.setItem('expiration', `${expTime}`);
        setLogIn(true);
        setCredetials({
            userId,
            expiration: expTime,
            token
        })
    };
    const handleLogout = () => {
        localStorage.clear();
        setLogIn(false);
        setCredetials({
            userId: '',
            expiration: 0,
            token: ''
        });
    };
    const checkLogin = () => {
        if(localStorage.getItem('token') && localStorage.getItem('expiration')) {
            if(localStorage.getItem('expiration') > Date.now()) {
                return setLogIn(true);
            }
            return handleLogout();
        }
        setLogIn(false);
    };
    return (
        <UserAuthContext.Provider value={{isLoggedIn, credentials, handleLogin, handleLogout, checkLogin}}>
            {props.children}
        </UserAuthContext.Provider>
    );
};
