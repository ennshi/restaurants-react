import React from 'react';
import FormInput from "./FormInput";
import {Form} from "react-final-form";

export default ({onSubmit, userData, errors, onDeleteProfile}) => {
    return (
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
    );
}
