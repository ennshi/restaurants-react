import React, {useContext, useState} from "react";
import {Form} from 'react-final-form';
import withUserAuth from "../../components/withUserAuth";
import {UserAuthContext} from "../../contexts/UserAuth";
import FormInput from "../../components/FormInput";
import ProfilePhoto from "../../components/ProfilePhoto";

const Profile = (props) => {
    const { credentials } = useContext(UserAuthContext);
    const [errors, setErrors] = useState(null);
    const onSubmit = () => {

    };
    return (
        <>
        <header>Profile Info</header>
        <div className="form__container form__container--profile">
            <ProfilePhoto />
            <Form
                onSubmit={onSubmit}
                render={(props) => {
                    const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                    const isDisabled = submitting || pristine || hasValidationErrors;
                    return (<form onSubmit={handleSubmit} className="form__body--light">
                            {errors ? <div className="form__error-block">
                                {errors.map(error => <p className="form__error">{error}</p>)}
                            </div> : ''}
                            <FormInput
                                name="username"
                                type="username"
                                label="Username"
                                placeholder=""
                                class="input--dark"
                                classLabel="input__label--dark"
                            />
                            <FormInput
                                name="email"
                                type="email"
                                label="Email"
                                placeholder=""
                                class="input--dark"
                                classLabel="input__label--dark"
                            />
                            <FormInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder=""
                                class="input--dark"
                                classLabel="input__label--dark"
                            />
                            <FormInput
                                name="repeatedPassword"
                                type="password"
                                label="Repeat Password"
                                placeholder=""
                                class="input--dark"
                                classLabel="input__label--dark"
                            />
                            <div className="btn__container">
                                <button type="submit" disabled={isDisabled} className={isDisabled ? "btn btn--inactive" : "btn btn--red"}>
                                    Save Changes
                                </button>
                            </div>
                    </form>);
                }}/>
        </div>
        </>
    );
};

export default withUserAuth(Profile);
