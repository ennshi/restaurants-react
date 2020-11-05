import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import withUserAuth from '../../components/common/auth/withUserAuth';
import {UserAuthContext} from '../../contexts/UserAuth';
import ProfilePhoto from '../../components/Profile/ProfilePhoto';
import fetchData from '../../helpers/fetchData';
import ReviewList from '../../components/common/review-list/ReviewList';
import ProfileForm from '../../components/Profile/ProfileForm';
import ProfileFormLoader from '../../components/Profile/loaders/ProfileFormLoader';
import ProfilePhotoLoader from '../../components/Profile/loaders/ProfilePhotoLoader';
import useInfiniteScroll from '../../hooks/infinite-scroll/useInfiniteScroll';
import {formNormalization} from '../../helpers/formNormalization';
import Header from "../../components/common/Header";
import {REVIEWS_URL, USER_PROFILE_URL} from "../../constants/urls";
import useFetchDataDidMount from "../../hooks/useFetchDataDidMount";
import ReviewListLoader from "../../components/common/review-list/ReviewListLoader";

const Profile = () => {
    const { credentials, handleLogout, checkAuthErrors } = useContext(UserAuthContext);
    const [displayReviews, setDisplayReviews] = useState(false);
    const [imgSize, setImgSize] = useState('25vw');
    const [inputWidth, setInputWidth] = useState('11rem');
    const history = useHistory();
    const reviewsUrl = `${REVIEWS_URL}?filter=creator::${credentials.userId}`;
    const {
        items: reviews,
        setItems: setReviews,
        totalNumber: totalNumberReviews,
        itemErrors: reviewErrors,
        LoadingComponent
    } = useInfiniteScroll(reviewsUrl, 'reviews');
    const [userData, userErrors, setUserData, setUserErrors] = useFetchDataDidMount({
        initialValue: null,
        url: USER_PROFILE_URL,
        itemType: 'user',
        token: credentials.token
    });
    const handleErrors = (fetchedData) => {
        checkAuthErrors(fetchedData);
        return setUserErrors(fetchedData.errors);
    };
    useEffect(() => {
        if(window.innerWidth > 670) {
            setImgSize('10rem');
            setInputWidth('13rem');
        }
    }, []);
    const onSubmitProfile = async (values) => {
        const result = await fetchData({
            url: USER_PROFILE_URL,
            method: 'PUT',
            token: credentials.token,
            data: JSON.stringify(formNormalization(values))
        });
        if (!result.errors.length) {
            return setUserData({...userData, ...result.response});
        }
        handleErrors(result);
    };
    const onDeleteProfile = async () => {
        if(window.confirm('Are you sure, you want to delete your profile?')) {
            const result = await fetchData({
                url: USER_PROFILE_URL,
                method: 'DELETE',
                token: credentials.token
            });
            if (!result.errors.length) {
                handleLogout();
                return history.push('/login', {errors: ['Account successfully deleted.']});
            }
            handleErrors(result);
        }
    };
    const toggleReviews = () => {
        setDisplayReviews(!displayReviews);
    };
    return (
        <main>
            <Header title="Profile" level={1} classContainer="light" />
            <section className="form__container form__container--profile">
                {(userData || userErrors) ?
                    (userData &&
                        <section className="profile-photo__container">
                            <ProfilePhoto url={userData.photoUrl} imgSize={imgSize}/>
                            <button className="btn btn--100 btn--red"
                                onClick={toggleReviews}>{displayReviews ? 'My Info' : `My Reviews (${userData.reviews.length})`}</button>
                        </section>) :
                    <ProfilePhotoLoader imgSize={imgSize} />
                }
                {displayReviews ?
                    <section className="user-review-list__container">
                        <ReviewList type="user" reviews={reviews} errors={reviewErrors} setReviews={setReviews} totalNumber={totalNumberReviews}/>
                        <LoadingComponent loader={ReviewListLoader}/>
                    </section> :
                    ((userData || userErrors) ?
                        <ProfileForm userData={userData}
                                     onSubmit={onSubmitProfile}
                                     onDeleteProfile={onDeleteProfile}
                                     errors={userErrors}
                        /> :
                        <ProfileFormLoader inputWidth={inputWidth} />
                    )
                }
            </section>
        </main>
    );
};

export default withUserAuth(Profile);
