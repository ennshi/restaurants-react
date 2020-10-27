import React, {useContext, useState} from 'react';
import {Field, Form} from 'react-final-form';
import {useHistory} from 'react-router-dom';
import {composeValidators, maxLength, minLength, required} from '../../../helpers/formValidation';
import fetchData from '../../../helpers/fetchData';
import {UserAuthContext} from '../../../contexts/UserAuth';
import './ReviewForm.css';

export default ({updateReview, addReview, onReset, review, restaurantId}) => {
    const {credentials, handleLogout} = useContext(UserAuthContext);
    const [errors, setErrors] = useState(null);
    const history = useHistory();
    const onSubmit = async (values) => {
        const method = updateReview ? 'PUT' : 'POST';
        const body = updateReview ? JSON.stringify({...values}) : JSON.stringify({...values, restaurant: restaurantId});
        const result = await fetchData(`http://localhost:8080/reviews/${review ? review._id : ''}`, {
            crossDomain: true,
            headers: {
                'Authorization': `Bearer ${credentials.token}`,
                'Content-Type': 'application/json'
            },
            method,
            body
        });
        if (result.errors.length) {
            if (result.errors[0] === 'Authorization failed') {
                handleLogout();
                return history.push('/login', {errors: [result.errors[0]]});
            }
            return setErrors(result.errors);
        }
        if(updateReview) {
            return updateReview({...review, ...values});
        }
        addReview(result.response);
    };
    const options = Array(5).fill(1).map((v, i) => (<option value={i+1} key={i}>{i+1}</option>));
    return (
        <Form
            initialValues={review && {text: review.text, rating: +review.rating}}
            onSubmit={onSubmit}
            render={(props) => {
                const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                const isDisabled = submitting || pristine || hasValidationErrors;
                return (<form onSubmit={handleSubmit} className="review-form__container">
                    {errors ? <div className="form__error-block">
                        {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                    </div> : ''}
                    <Field name="rating">
                        {({input, meta}) => (
                            <div className="review-form__select__container">
                                <label className="review-form__select__label">Rating</label>
                                <select {...input} className="review-form__select">{options}</select>
                                {meta.error && meta.touched && <span className="input__error">{meta.error}</span>}
                            </div>
                        )}
                    </Field>
                    <Field
                        name="text"
                        validate={composeValidators(required, minLength(10), maxLength(300))}
                    >
                        {({input, meta}) => (
                            <>
                                <textarea {...input} className="review-form__textarea"></textarea>
                                {meta.error && meta.touched && <span className="input__error">{meta.error}</span>}
                            </>
                        )}
                    </Field>
                    <div className="btn__container--horizontal">
                        <button type="submit" disabled={isDisabled} className={isDisabled ? "btn btn--inactive btn--multiple-in-row" : "btn btn--red btn--multiple-in-row"}>
                            Save
                        </button>
                        <button className="btn btn--multiple-in-row" onClick={onReset}>
                            Cancel
                        </button>
                    </div>
                </form>);
            }}
        />
    )
};
