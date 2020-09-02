import React from "react";
import {Form} from "react-final-form";
import FormInput from "../../components/FormInput";
import {Link} from "react-router-dom";
import {
    composeValidators,
    maxLength,
    minLength,
    required,
    validEmail,
    validPassword
} from "../../helpers/formValidation";

export default () => {
    const onSubmit = async values => {
        await console.log(JSON.stringify(values));
    };
    return (
            <div className="form__container form__container--dark">
                <Form
                    onSubmit={onSubmit}
                    validate={(values) => {
                        const errors = {};
                        if(values['repeated-password'] !== values.password) {
                            errors['repeated-password'] = 'Passwords must match';
                        }
                        return errors;
                    }}
                    render={(props) => {
                        const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                        const isDisabled = submitting || pristine || hasValidationErrors;
                        return (<form onSubmit={handleSubmit}>
                            <FormInput
                                name="username"
                                type="text"
                                label="Username"
                                placeholder=""
                                class="input--basic"
                                validate={composeValidators(required, minLength(5), maxLength(100))}
                            />
                            <FormInput
                                name="email"
                                type="email"
                                label="Email"
                                placeholder=""
                                class="input--basic"
                                validate={composeValidators(required, validEmail)}
                            />
                            <FormInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder=""
                                class="input--basic"
                                validate={composeValidators(required, validPassword)}
                            />
                            <FormInput
                                name="repeated-password"
                                type="password"
                                label="Repeat Password"
                                placeholder=""
                                class="input--basic"
                            />
                            <div className="btn__container">
                                <button type="submit" disabled={isDisabled} className={isDisabled ? "btn btn--inactive" : "btn btn--red"}>
                                    Sign up
                                </button>
                            </div>
                            <div className="option__container">
                                <span className="option__text">Already have an account? </span>
                                <Link to="/login" className="option__link">Log in</Link>
                            </div>
                        </form>);
                    }}/>
            </div>
    );
};
