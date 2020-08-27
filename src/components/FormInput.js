import React from 'react';
import {Field} from 'react-final-form';
import './FormInput.css';

export default (props) => {
    return (
        <div className="input__container">
           <label className="input__label">{props.label}</label>
           <Field name={props.name} component="input" type={props.type} placeholder={props.placeholder} className={props.class}/>
        </div>
    )
};
