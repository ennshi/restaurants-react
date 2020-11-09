import React from 'react';

export default ({title, level, classContainer, classHeading}) => {
    const HTag = `h${level}`;
    return (
        <header className={`heading__container heading__container--${classContainer}`}>
            <HTag className={`heading heading--${classHeading}`}>{title}</HTag>
        </header>
    );
};
