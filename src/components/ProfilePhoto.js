import React from 'react';
import {Form, Field} from 'react-final-form';
import {OnChange} from 'react-final-form-listeners';
import './ProfilePhoto.css';

export default () => {
    const onSubmit = (val) => {

    };
    return (
        <div className="profile-photo__container">
            <img src="logo192.png" alt="profile-photo"/>
            <Form onSubmit={onSubmit}
                  render={(props) => {
                      const {handleSubmit} = props;
                      return (
                          <form>
                              <label className="btn btn--red">
                                  <Field  name="avatar" component="input" type="file" />
                                  Change Photo
                              </label>
                              <OnChange name="avatar">{(val) => onSubmit(val)}</OnChange>
                          </form>
                      );
                  }}
            />
        </div>
    );
};
