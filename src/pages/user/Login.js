import React, {useContext, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Form} from 'react-final-form';
import FormInput from '../../components/common/FormInput';
import {required} from '../../helpers/formValidation';
import fetchData from '../../helpers/fetchData';
import {UserAuthContext} from '../../contexts/UserAuth';
import {formNormalization} from '../../helpers/formNormalization';
import Header from "../../components/common/Header";
import Error from "../../components/common/Error";
import {USER_LOGIN_URL} from "../../constants/urls";

export default props => {
    const [errors, setErrors] = useState(() => {
        if(props.location.state) {
            return props.location.state.errors ? props.location.state.errors : null;
        }
        return null;
    });
    const { handleLogin } = useContext(UserAuthContext);
    const history = useHistory();
    const onSubmit = async values => {
        const fetchedData = await fetchData({
            url: USER_LOGIN_URL,
            method: 'POST',
            data: JSON.stringify(formNormalization(values))
        });
        if(!fetchedData.errors.length) {
            const {token, userId} = fetchedData.response;
            handleLogin({token, userId});
            return history.push('/');
        }
        setErrors(fetchedData.errors);
    };
    return (
        <main className="form__container form__container--dark">
            <Header title="Log in" level={1} classContainer="light" classHeading="lighter" />
            <Error errors={errors} />
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
                            classLabel="input__label input__label--light"
                        />
                        <FormInput
                            name="password"
                            type="password"
                            label="Password"
                            placeholder=""
                            class="input--basic"
                            validate={required}
                            classLabel="input__label input__label--light"
                        />
                        <div className="btn__container">
                            <button type="submit" disabled={isDisabled} className={isDisabled ? "btn btn--100 btn--inactive" : "btn btn--100 btn--red"}>
                                Log in
                            </button>
                        </div>
                        <div className="option__container">
                            <span className="option__text">No account yet? </span>
                            <Link to="/sign-up" className="option__link">Sign up</Link>
                        </div>
                    </form>);
                }}
            />
        </main>
    );
};
