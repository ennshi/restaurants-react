import React, {useContext, useEffect, useState} from 'react';
import './ProfilePhoto.css';
import {invalidImage} from '../../helpers/formValidation';
import fetchData from '../../helpers/fetchData';
import {UserAuthContext} from '../../contexts/UserAuth';
import {convertUrl} from '../../helpers/pathConverters';
import Image from '../common/Image';
import Error from "../common/Error";
import {USER_AVATAR_URL} from "../../constants/urls";

export default ({url, imgSize}) => {
    const { credentials, checkAuthErrors } = useContext(UserAuthContext);
    const [errors, setErrors] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    useEffect(() => {
        if(url) {
            setPhotoUrl(convertUrl(url));
        }
    }, []);
    const onSubmit = async (ev) => {
        const img = ev.target.files[0];
        const error = invalidImage(img);
        if (error) {
            return setErrors([error]);
        }
        setErrors(null);
        const fData = new FormData();
        fData.append('avatar', img);
        const result = await fetchData({
            url: `${USER_AVATAR_URL}`,
            method: 'POST',
            token: credentials.token,
            dataType: 'form-data',
            data: fData
        });
        if (result.errors.length) {
            checkAuthErrors(result);
            return setErrors(result.errors);
        }
        setPhotoUrl(convertUrl(result.response.photoUrl));
    };
    return (
        <>
            <Image width={imgSize} height={imgSize} alt="user" url={photoUrl} classes="profile-photo__image" />
            <form>
                <Error errors={errors} />
                <label className="btn--link">
                    <input  name="avatar" type="file" onChange={(ev) => onSubmit(ev)}/>
                    Change Photo
                </label>
            </form>
        </>
    );
};
