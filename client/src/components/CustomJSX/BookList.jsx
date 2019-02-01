import PropTypes from 'prop-types';
import { BookRow } from './BookRow';
import React from 'react';
export const BookList = ({array, highlight, visibility}) => {

	if (visibility && array[0] !== null) {
		return(
            <div id="book-list">
            
                <ul className="cardList">
                    {array.map((entry, i) => 
                        <BookRow 
                            key = {i}
                            rowNum = {i}
                            title = {entry.book_details[0].title}
                            author = {entry.book_details[0].author}
                            description = {entry.book_details[0].description}
                            highlight = {highlight}
                        />
                        )}
                
                </ul>

			</div>
		)} else {
		return null;
	}
}

BookList.propTypes = {
	data: PropTypes.array
}