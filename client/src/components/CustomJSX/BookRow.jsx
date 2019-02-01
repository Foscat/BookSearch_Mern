import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import React from 'react';

export const BookRow = ({rowNum, title, author, highlight}) => {

    // Scroll to the top of ui when user selects an entry
    const click = () => {
        highlight({
            highlight: rowNum
        })
        Scroll.animateScroll.scrollToTop();
    } // End click


    return (
        <div onClick={click}>
            <h3>{title}</h3>
            <h5>{author}</h5>
        </div>
    )

   
}

BookRow.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string
}