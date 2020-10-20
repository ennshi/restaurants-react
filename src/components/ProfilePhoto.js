import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import './ProfilePhoto.css';
import {invalidImage} from "../helpers/formValidation";
import fetchData from "../helpers/fetchData";
import {UserAuthContext} from "../contexts/UserAuth";
import {convertUrl} from "../helpers/pathConverters";
import Image from "./Image";

export default ({url, imgSize}) => {
    const { credentials, handleLogout } = useContext(UserAuthContext);
    const [errors, setErrors] = useState(null);
    const [photoUrl, setPhotoUrl] = useState('');
    const history = useHistory();
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
        const result = await fetchData('http://localhost:8080/profile/avatar', {
            crossDomain: true,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${credentials.token}`
            },
            body: fData
        });
        if (result.errors.length) {
            if(result.errors[0] === 'Authorization failed') {
                handleLogout();
                return history.push('/login', {errors: [result.errors[0]]});
            }
            return setErrors(result.errors);
        }
        setPhotoUrl(convertUrl(result.response.photoUrl));
    };
    return (
        <>
            <Image width={imgSize} height={imgSize} alt="user" src={photoUrl} classes="profile-photo__image" />
            <form>
                {errors ? <div className="form__error-block">
                    {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                </div> : ''}
              <label className="btn--link">
                  <input  name="avatar" type="file" onChange={(ev) => onSubmit(ev)}/>
                  Change Photo
              </label>
            </form>
        </>
    );
};
