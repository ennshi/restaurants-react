import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import withUserAuth from '../../components/common/auth/withUserAuth';
import {UserAuthContext} from '../../contexts/UserAuth';
import ProfilePhoto from '../../components/Profile/ProfilePhoto';
import fetchData from '../../helpers/fetchData';
import ReviewList from '../../components/common/review-list/ReviewList';
import ProfileForm from '../../components/Profile/ProfileForm';
import InfiniteScroll from '../../components/common/infinite-scroll/InfiniteScroll';
import ProfileFormLoader from '../../components/Profile/loaders/ProfileFormLoader';
import ProfilePhotoLoader from '../../components/Profile/loaders/ProfilePhotoLoader';
import {withInfiniteScroll} from '../../components/common/infinite-scroll/withInfiniteScroll';
import {formNormalization} from '../../helpers/formNormalization';
import Header from "../../components/common/Header";

const Profile = (props) => {
    const { credentials, handleLogout } = useContext(UserAuthContext);
    const [userErrors, setUserErrors] = useState(null);
    const [userData, setUserData] = useState(null);
    const [displayReviews, setDisplayReviews] = useState(false);
    const [reviewErrors, setReviewErrors] = useState(null);
    const [imgSize, setImgSize] = useState('25vw');
    const [inputWidth, setInputWidth] = useState('11rem');
    const history = useHistory();
    const {
        items: reviews,
        setItems: setReviews,
        page,
        totalNumber: totalNumberReviews,
        setTotalNumber: setTotalNumberReviews,
        isFetching: isFetchingReviews,
        nextItems
    } = props;
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
        if(window.innerWidth > 670) {
            setImgSize('10rem');
            setInputWidth('13rem');
        }
    }, []);
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
            body: JSON.stringify(formNormalization(values))
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
                return history.push('/login', {errors: ['Account successfully deleted.']});
            }
            handleErrors({fetchedData: result, type: 'user'});
        }
    };
    const fetchingReviews = async () => {
        isFetchingReviews.current = true;
        const headers = {
            'Authorization': `Bearer ${credentials.token}`,
            'Content-Type': 'application/json'
        };
        const fetchedData = await fetchData(`http://localhost:8080/reviews?filter=creator::${credentials.userId}&page=${page.current}`, {
            crossDomain: true,
            method: 'GET',
            headers
        });
        isFetchingReviews.current = false;
        if (!fetchedData.errors.length) {
            page.current++;
            !totalNumberReviews && setTotalNumberReviews(fetchedData.response.totalNumber);
            return setReviews(prevVal => prevVal ? [...prevVal, ...fetchedData.response.reviews] : fetchedData.response.reviews);
        }
        handleErrors({fetchedData, type: 'reviews'});
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
                            <ProfilePhoto url={userData.user.photoUrl} imgSize={imgSize}/>
                            <button className="btn btn--100 btn--red"
                                onClick={toggleReviews}>{displayReviews ? 'My Info' : `My Reviews (${userData.reviews.length})`}</button>
                        </section>) :
                    <ProfilePhotoLoader imgSize={imgSize} />
                }
                {displayReviews ?
                    <section className="user-review-list__container">
                        <ReviewList type="user" reviews={reviews} errors={reviewErrors} setReviews={setReviews} totalNumber={totalNumberReviews}/>
                        <InfiniteScroll fetchItems={fetchingReviews} type="reviews" isFetching={isFetchingReviews} nextItems={nextItems}/>
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

export default withUserAuth(withInfiniteScroll(Profile));
