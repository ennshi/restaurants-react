import React, {useContext, useEffect, useState} from "react";
import {Form} from 'react-final-form';
import { useHistory } from 'react-router-dom';
import withUserAuth from "../../components/withUserAuth";
import {UserAuthContext} from "../../contexts/UserAuth";
import FormInput from "../../components/FormInput";
import ProfilePhoto from "../../components/ProfilePhoto";
import fetchData from "../../helpers/fetchData";
import UserReviewList from "../../components/UserReviewList";

const Profile = (props) => {
    const { credentials, handleLogout } = useContext(UserAuthContext);
    const [errors, setErrors] = useState(null);
    const [userData, setUserData] = useState(null);
    const [displayReviews, setDisplayReviews] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const fetchingData = async () => {
            const fetchedData = await fetchData('http://localhost:8080/profile', {
                crossDomain: true,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${credentials.token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!fetchedData.errors.length) {
                return setUserData(fetchedData.response);
            }
            if(fetchedData.errors[0] === 'Authorization failed') {
                handleLogout();
                return history.push('/login', {errors: [fetchedData.errors[0]]});
            }
            setErrors(fetchedData.errors);
        };
        fetchingData();
    }, []);
    const onSubmit = async (values) => {
        const result = await fetchData('http://localhost:8080/profile', {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${credentials.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (result.errors.length) {
            if(result.errors[0] === 'Authorization failed') {
                handleLogout();
                return history.push('/login', {errors: [result.errors[0]]});
            }
            return setErrors(result.errors);
        }
        setUserData({...userData, user: result.response});
    };
    const onDeleteProfile = async () => {
        if(window.confirm('Are you sure, you want to delete your profile?')) {
            const result = await fetchData('http://localhost:8080/profile', {
                crossDomain: true,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${credentials.token}`
                }
            });
            if (result.errors.length) {
                if(result.errors[0] === 'Authorization failed') {
                    handleLogout();
                    return history.push('/login', {errors: [result.errors[0]]});
                }
                return setErrors(result.errors);
            }
            handleLogout();
            history.push('/');
        }
    };
    const toggleReviews = () => {
        setDisplayReviews(!displayReviews);
    };
    return (
        <>
        <header>Profile Info</header>
        <div className="form__container form__container--profile">
            {userData ?
                <>
                <div className="profile-photo__container">
                    <ProfilePhoto url={userData.user.photoUrl}/>
                    <button className="btn btn--100 btn--red" onClick={toggleReviews}>{displayReviews ? 'My Info' : `My Reviews (${userData.reviews.length})`}</button>
                </div>
                    { displayReviews ? <UserReviewList /> :
                        <Form
                            onSubmit={onSubmit}
                            initialValues={{username: userData.user.username, email: userData.user.email}}
                            render={(props) => {
                                const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                                const isDisabled = submitting || pristine || hasValidationErrors;
                                return (
                                    <div className="form__body--light">
                                        <form onSubmit={handleSubmit}>
                                            {errors ? <div className="form__error-block">
                                                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                                            </div> : ''}
                                            <FormInput
                                                name="username"
                                                type="username"
                                                label="Username"
                                                placeholder=""
                                                class="input--dark"
                                                classLabel="input__label input__label--dark"
                                            />
                                            <FormInput
                                                name="email"
                                                type="email"
                                                label="Email"
                                                placeholder=""
                                                class="input--dark"
                                                classLabel="input__label input__label--dark"
                                            />
                                            <FormInput
                                                name="password"
                                                type="password"
                                                label="Password"
                                                placeholder=""
                                                class="input--dark"
                                                classLabel="input__label input__label--dark"
                                            />
                                            <FormInput
                                                name="repeatedPassword"
                                                type="password"
                                                label="Repeat Password"
                                                placeholder=""
                                                class="input--dark"
                                                classLabel="input__label input__label--dark"
                                            />
                                            <div className="btn__container">
                                                <button type="submit" disabled={isDisabled}
                                                        className={isDisabled ? "btn btn--100 btn--inactive" : "btn btn--100 btn--red"}>
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                        <button type="button" className="btn--link" onClick={onDeleteProfile}>Delete the
                                            profile and related data
                                        </button>
                                    </div>);
                            }}
                        />
                    }
                    </>: ''}
        </div>
        </>
    );
};

export default withUserAuth(Profile);
