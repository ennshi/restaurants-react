import React from 'react';
import {Form} from 'react-final-form';
import FormInput from '../common/FormInput';
import {required} from '../../helpers/formValidation';
import './RestaurantSearchForm.css';
import Error from '../common/Error';
import Header from "../common/Header";

export default ({submitHandler, errors}) => {
    return (
        <section className="form__container restaurant-search-form__container">
            <Header title="Looking for a place to have dinner?" level={1} classContainer="light" classHeading="large"/>
            <Error errors={errors} />
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
                            hideError={true}
                            ariaLabel="Search"
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
        </section>
    );
}
