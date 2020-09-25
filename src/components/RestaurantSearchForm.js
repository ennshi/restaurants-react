import React from 'react';
import {Form} from 'react-final-form';
import FormInput from './FormInput';
import {required} from '../helpers/formValidation';
import './RestaurantSearchForm.css';

export default ({submitHandler}) => {
    return (
        <div className="form__container restaurant-search-form__container">
            <header className="restaurant-search-form__header">
                <h2>Loking for a place to have dinner?</h2>
            </header>
            <Form
            onSubmit={submitHandler}
            render={(props) => {
                const {handleSubmit, pristine, submitting, hasValidationErrors} = props;
                const isDisabled = submitting || pristine || hasValidationErrors;
                return (<form onSubmit={handleSubmit}>
                        <FormInput
                            name="filter"
                            type="text"
                            placeholder="Where to?"
                            class="input--basic"
                            validate={required}
                            />
                        <div className="btn__container">
                            <button type="submit" disabled={isDisabled} className={isDisabled ? "btn btn--100 btn--inactive" : "btn btn--100 btn--red"}>
                                Search
                            </button>
                        </div>
                    </form>
                );
            }}
            />
        </div>
    );
}
