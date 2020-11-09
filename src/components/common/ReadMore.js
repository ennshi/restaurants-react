import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './ReadMore.css';

const ReadMore = ({text, numChar, readMoreText}) => {
    const [textInit] = useState(text);
    const [textBox, setTextBox] = useState(text.slice(0, numChar));
    const openTextInit = () => {
        setTextBox(textInit);
    };
    const readMoreNeeded = textInit.length > textBox.length;
    return (
        <p>{textBox}{readMoreNeeded ? <span>... <span className="btn--readMore" onClick={openTextInit}>{readMoreText}</span></span> : ''}</p>
    );
};

ReadMore.propTypes = {
    text: PropTypes.string,
    numChar: PropTypes.number,
    readMoreText: PropTypes.string
};

export default ReadMore;
