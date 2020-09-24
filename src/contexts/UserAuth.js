import React, {useState} from 'react';

export const UserAuthContext = React.createContext({});

export const UserAuthProvider = (props) => {
    const [isLoggedIn, setLogIn] = useState(false);
    const checkLogin = () => {
        console.log('Check login');
        if(localStorage.getItem('token') && localStorage.getItem('expiration')) {
            const storeId = localStorage.getItem('user');
            const storeExp = +localStorage.getItem('expiration');
            const storeToken = localStorage.getItem('token');
            if(storeExp > Date.now()) {
                setLogIn(true);
                return {
                    userId: storeId,
                    expiration: storeExp,
                    token: storeToken
                };
            }
            localStorage.clear();
            setLogIn(false);
            return {
                userId: '',
                expiration: 0,
                token: ''
            };
        }
        setLogIn(false);
    };
    const [credentials, setCredentials] = useState(() => checkLogin());
    const handleLogin = ({token, userId}) => {
        localStorage.clear();
        const expTime = Date.now() + 3600*1000;
        localStorage.setItem('token', token);
        localStorage.setItem('user', userId);
        localStorage.setItem('expiration', `${expTime}`);
        setLogIn(true);
        setCredentials({
            userId,
            expiration: expTime,
            token
        })
    };
    const handleLogout = () => {
        localStorage.clear();
        setLogIn(false);
        setCredentials({
            userId: '',
            expiration: 0,
            token: ''
        });
    };
    return (
        <UserAuthContext.Provider value={{isLoggedIn, credentials, handleLogin, handleLogout}}>
            {props.children}
        </UserAuthContext.Provider>
    );
};
