import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Form} from 'react-final-form';
import FormInput from '../../components/common/FormInput';
import {
    composeValidators,
    maxLength,
    minLength,
    required,
    validEmail,
    validPassword
} from '../../helpers/formValidation';
import fetchData from '../../helpers/fetchData';
import {formNormalization} from '../../helpers/formNormalization';
import Error from "../../components/common/Error";
import Header from "../../components/common/Header";
import {USER_PROFILE_URL} from "../../constants/urls";

export default () => {
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const onSubmit = async values => {
        const fetchedData = await fetchData({
            url: USER_PROFILE_URL,
            method: 'POST',
            data: JSON.stringify(formNormalization(values))
        });
        if(!fetchedData.errors.length) {
            return history.push('/login', {errors: ['Please log in the system.']});
        }
        setErrors(fetchedData.errors);
    };
    return (
            <main className="form__container form__container--dark">
                <Header title="Sign up" level={1} classContainer="light" classHeading="lighter" />
                <Error errors={errors} />
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
            </main>
    );
};
