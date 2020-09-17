import React, {useContext, useState} from 'react';
import {Form} from 'react-final-form';
import FormInput from "../../components/FormInput";
import {Link, useHistory} from "react-router-dom";
import {required} from "../../helpers/formValidation";
import fetchData from "../../helpers/fetchData";
import {UserAuthContext} from "../../contexts/UserAuth";

export default () => {
    const [errors, setErrors] = useState(null);
    const { handleLogin } = useContext(UserAuthContext);
    const history = useHistory();
    const onSubmit = async values => {
        const fetchedData = await fetchData('http://localhost:8080/auth/login', {
            crossDomain: true,
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(values)
        });
        if(!fetchedData.error && !fetchedData.response.errors) {
            const {token, userId} = fetchedData.response;
            handleLogin({token, userId});
            return history.push('/');
        }
        fetchedData.error ? setErrors(['Server error. Please try again later.']) : setErrors(Object.values(fetchedData.response.errors));
    };
    return (
        <div className="form__container form__container--dark">
        <Form
            onSubmit={onSubmit}
            render={(props) => {
                const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                const isDisabled = submitting || pristine || hasValidationErrors;
                return (<form onSubmit={handleSubmit}>
                    {errors ? <div className="form__error-block">
                        {errors.map(error => <p className="form__error">{error}</p>)}
                    </div> : ''}
                    <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        placeholder=""
                        class="input--basic"
                        validate={required}
                    />
                    <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        placeholder=""
                        class="input--basic"
                        validate={required}
                    />
                    <div className="btn__container">
                        <button type="submit" disabled={isDisabled} className={isDisabled ? "btn btn--inactive" : "btn btn--red"}>
                            Log in
                        </button>
                    </div>
                    <div className="option__container">
                        <span className="option__text">No account yet? </span>
                        <Link to="/sign-up" className="option__link">Sign up</Link>
                    </div>
                </form>);
            }}/>
        </div>
    );
};
