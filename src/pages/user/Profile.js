import React, {useContext, useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import withUserAuth from "../../components/withUserAuth";
import {UserAuthContext} from "../../contexts/UserAuth";
import ProfilePhoto from "../../components/ProfilePhoto";
import fetchData from "../../helpers/fetchData";
import ReviewList from "../../components/ReviewList";
import ProfileForm from "../../components/ProfileForm";

const Profile = () => {
    const { credentials, handleLogout } = useContext(UserAuthContext);
    const [userErrors, setUserErrors] = useState(null);
    const [userData, setUserData] = useState(null);
    const [displayReviews, setDisplayReviews] = useState(false);

    const [reviewErrors, setReviewErrors] = useState(null);
    const [reviews, setReviews] = useState(null);

    const history = useHistory();

    const handleErrors = ({fetchedData, type}) => {
        if(fetchedData.errors[0] === 'Authorization failed') {
            handleLogout();
            return history.push('/login', {errors: [fetchedData.errors[0]]});
        }
        if(type === 'user') {
            return setUserErrors(fetchedData.errors);
        }
        setReviewErrors(fetchedData.errors);
    };
    useEffect(() => {
        const fetchingUserData = async () => {
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
            handleErrors({fetchedData, type: 'user'});
        };
        fetchingUserData();
    }, []);
    const onSubmitProfile = async (values) => {
        const result = await fetchData('http://localhost:8080/profile', {
            crossDomain: true,
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${credentials.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });
        if (!result.errors.length) {
            return setUserData({...userData, user: result.response});
        }
        handleErrors({fetchedData: result, type: 'user'});
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
            if (!result.errors.length) {
                handleLogout();
                return history.push('/');
            }
            handleErrors({fetchedData: result, type: 'user'});
        }
    };

    const fetchingReviews = async () => {
        const headers = {
            'Authorization': `Bearer ${credentials.token}`,
            'Content-Type': 'application/json'
        };
        const fetchedData = await fetchData(`http://localhost:8080/reviews?filter=$creator::${credentials.userId}`, {
            crossDomain: true,
            method: 'GET',
            headers
        });
        if (!fetchedData.errors.length) {
            return setReviews(fetchedData.response.reviews);
        }
        handleErrors({fetchedData, type: 'reviews'});
    };
    const toggleReviews = () => {
        setDisplayReviews(!displayReviews);
    };
    return (
        <>
        <header className="heading__container heading__container--light">
            <h1 className="heading">Profile Info</h1>
        </header>
        <div className="form__container form__container--profile">
            {userData ?
                <>
                <div className="profile-photo__container">
                    <ProfilePhoto url={userData.user.photoUrl}/>
                    <button className="btn btn--100 btn--red" onClick={toggleReviews}>{displayReviews ? 'My Info' : `My Reviews (${userData.reviews.length})`}</button>
                </div>
                    { displayReviews ? <ReviewList type='user' reviews={reviews} errors={reviewErrors} setReviews={setReviews}/> :
                        <ProfileForm userData={userData} onSubmit={onSubmitProfile} onDeleteProfile={onDeleteProfile} errors={userErrors}/>
                    }
                    </>: ''}
        </div>
        </>
    );
};

export default withUserAuth(Profile);
