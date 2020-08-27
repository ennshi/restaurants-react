import React from 'react';
import {Form} from 'react-final-form';
import FormInput from "../../components/FormInput";
import {Link} from "react-router-dom";

export default () => {
    const onSubmit = async values => {
        await console.log(JSON.stringify(values));
    };
    return (
        <>
        <div className="form__container form__container--dark">
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" label="Email" placeholder="" class="input--basic"/>
                    <FormInput name="password" type="password" label="Password" placeholder="" class="input--basic"/>
                    <div className="btn__container">
                        <button type="submit" disabled={submitting || pristine} className="btn btn--inactive">
                            Log in
                        </button>
                    </div>
                    <div className="option__container">
                        <span className="option__text">No account yet? </span>
                        <Link to="/sign-up" className="option__link">Sign up</Link>
                    </div>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}/>
        </div>
        </>
    );
};
