import React from 'react';
import {Form} from 'react-final-form';
import FormInput from "../../components/FormInput";
import {Link} from "react-router-dom";

export default () => {
    const onSubmit = async values => {
        await console.log(JSON.stringify(values));
    };
    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" label="Email" placeholder=""/>
                    <FormInput name="password" type="password" label="Password" placeholder=""/>
                    <div className="buttons">
                        <button type="submit" disabled={submitting || pristine}>
                            Submit
                        </button>
                    </div>
                    No account yet? <Link to="/sign-up">Sign Up</Link>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
            )}/>
    );
};
