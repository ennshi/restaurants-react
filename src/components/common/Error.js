import React from 'react';

export default ({errors}) => {
    return (
        errors ?
            <section className="form__error-block">
                {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
            </section> :
            null
    );
};
