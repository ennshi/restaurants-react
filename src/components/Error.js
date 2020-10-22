import React from 'react';

export default ({errors}) => {
    return (
        errors ?
            <section>
                <div className="form__error-block">
                    {errors.map((error, i) => <p className="form__error" key={i}>{error}</p>)}
                </div>
            </section> :
            null
    );
};
