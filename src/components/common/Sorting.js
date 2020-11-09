import React from 'react';
import './Sorting.css';

export default ({name, options, initialValue, sortHandler, classes}) => {
    const changeHandler = (e) => {
        sortHandler(e.target.value);
    };
    return (
       <form className={classes}>
           <select name={name}
                   className="sorting__select"
                   value={initialValue}
                   onChange={(e) => changeHandler(e)}
                   aria-label="Sort"
           >
               {options.map((option, i) => <option value={option.value} key={i}>{option.title}</option>)}
           </select>
       </form>
    );
};
