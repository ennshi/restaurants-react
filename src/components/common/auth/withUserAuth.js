import React, { useContext } from 'react';
import { Redirect } from "react-router-dom";
import { UserAuthContext } from "../../../contexts/UserAuth";

const withUserAuth = ComposedComponent => {
    return (props) => {
        const { isLoggedIn } = useContext(UserAuthContext);
        if(!isLoggedIn) {
            return <Redirect to={'/login'} />;
        }
        return <ComposedComponent {...props} />
    };
};

export default withUserAuth;
