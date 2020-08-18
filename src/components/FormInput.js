import React from 'react';
import {Field} from 'react-final-form';

export default (props) => {
    return (
        <div>
           <label>{props.label}</label>
           <Field name={props.name} component="input" type={props.type} placeholder={props.placeholder}/>
        </div>
    )
};
