import React from 'react';
import {Field} from 'react-final-form';
import './FormInput.css';

export default (props) => {
    return (
        <div className="input__container">
           <label className={props.classLabel || "input__label"}>{props.label}</label>
           <Field
               name={props.name}
               validate={props.validate}
           >
               {({input, meta}) => (
                   <>
                        <input {...input} type={props.type} placeholder={props.placeholder} className={props.class} />
                        {props.hideError ? '' : meta.error && meta.touched && <span className="input__error">{meta.error}</span>}
                   </>
               )}
           </Field>
        </div>
    )
};
