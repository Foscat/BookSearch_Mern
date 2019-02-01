import React from 'react';
import PropTypes from 'prop-types';
import { BookRow } from './BookRow';

export const SavedList = ({data, highlight, visibility}) => {

	if (visibility) {
		return(
			<div id="savedBooks">
				{data.map((entry, i) =>
					<BookRow key = {i}
					         rowNum = {i}
					         title = {entry.book_details[0].title}
                            author = {entry.book_details[0].author}
                            description = {entry.book_details[0].description}
                            highlight = {highlight}
					/>
				)}
			</div>
		)
	} else {
		return null;
	}
}

SavedList.propTypes = {
	data: PropTypes.array
}