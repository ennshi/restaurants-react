import React, {useState} from "react";
import {Form} from "react-final-form";
import FormInput from "../../components/FormInput";
import {Link, useHistory} from "react-router-dom";
import {
    composeValidators,
    maxLength,
    minLength,
    required,
    validEmail,
    validPassword
} from "../../helpers/formValidation";
import fetchData from "../../helpers/fetchData";

export default () => {
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const onSubmit = async values => {
        const fetchedData = await fetchData('http://localhost:8080/profile', {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        });
        if(!fetchedData.error && !fetchedData.response.errors) {
            return history.push('/login');
        }
        fetchedData.error ? setErrors(['Server error. Please try again later.']) : setErrors(Object.values(fetchedData.response.errors));
    };
    return (
            <div className="form__container form__container--dark">
                <Form
                    onSubmit={onSubmit}
                    validate={(values) => {
                        const errors = {};
                        if(values.repeatedPassword !== values.password) {
                            errors.repeatedPassword = 'Passwords must match';
                        }
                        return errors;
                    }}
                    render={(props) => {
                        const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                        const isDisabled = submitting || pristine || hasValidationErrors;
                        return (<form onSubmit={handleSubmit}>
                            {errors ? <div className="form__error-block">
                                {errors.map(error => <p className="form__error">{error}</p>)}
                            </div> : ''}
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
                                name="repeatedPassword"
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
