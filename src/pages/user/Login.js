import React from 'react';
import {Form} from 'react-final-form';
import FormInput from "../../components/FormInput";
import {Link} from "react-router-dom";
import {required} from "../../helpers/formValidation";

export default () => {
    const onSubmit = async values => {
        await console.log(JSON.stringify(values));
    };
    return (
        <div className="form__container form__container--dark">
        <Form
            onSubmit={onSubmit}
            render={(props) => {
                const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                const isDisabled = submitting || pristine || hasValidationErrors;
                return (<form onSubmit={handleSubmit}>
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
