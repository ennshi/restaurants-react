import React from "react";
import withUserAuth from "../../components/withUserAuth";

const Profile = (props) => {
    return (
        <div>
            <h1>Profile</h1>
        </div>
    );
};

export default withUserAuth(Profile);
