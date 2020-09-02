const required = value => (value ? (value.trim() ? undefined : 'Required') : 'Required');
const validEmail = value => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (regexp.test(value.trim()) ? undefined : 'Enter a valid email');
};
const validPassword = value => {
    const regexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    return (regexp.test(value.trim()) ? undefined : 'Password must be 7-15 chars and contain at least one number and a special char');
};
const minLength = num => value => (value.trim().length >= num ? undefined : `Must consist of at least ${num} chars`);
const maxLength = num => value => (value.trim().length < num ? undefined : `Must consist of ${num} chars max`);
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined);

module.exports = {composeValidators, required, validEmail, validPassword, maxLength, minLength};
