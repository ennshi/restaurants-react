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
import {formNormalization} from "../../helpers/formNormalization";

export default () => {
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const onSubmit = async values => {
        const fetchedData = await fetchData('http://localhost:8080/profile', {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(formNormalization(values))
        });
        if(!fetchedData.errors.length) {
            return history.push('/login');
        }
        setErrors(fetchedData.errors);
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
                                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                            </div> : ''}
                            <FormInput
                                name="username"
                                type="text"
                                label="Username"
                                placeholder=""
                                class="input--basic"
                                validate={composeValidators(required, minLength(5), maxLength(100))}
                                classLabel="input__label input__label--light"
                            />
                            <FormInput
                                name="email"
                                type="email"
                                label="Email"
                                placeholder=""
                                class="input--basic"
                                validate={composeValidators(required, validEmail)}
                                classLabel="input__label input__label--light"
                            />
                            <FormInput
                                name="password"
                                type="password"
                                label="Password"
                                placeholder=""
                                class="input--basic"
                                validate={composeValidators(required, validPassword)}
                                classLabel="input__label input__label--light"
                            />
                            <FormInput
                                name="repeatedPassword"
                                type="password"
                                label="Repeat Password"
                                placeholder=""
                                class="input--basic"
                                classLabel="input__label input__label--light"
                            />
                            <div className="btn__container">
                                <button type="submit" disabled={isDisabled} className={isDisabled ? "btn btn--100 btn--inactive" : "btn btn--100 btn--red"}>
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
