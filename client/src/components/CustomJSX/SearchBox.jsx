import PropTypes from 'prop-types';
import React from 'react';

export const SearchBox = ({type, queryObj}) => {

    let formSearch;

	const submit = (e) => {
		e.preventDefault();
		queryObj({
			type: formSearch.value,
		});
	};

    
    return(
		<nav aria-label="Book search form" id="book-form">

                    <form 
                        onSubmit={submit} 
                        ref={input => formSearch = input} 
                        className="form-group">

                            <input type="text" name="formSearch" placeholder="Type a search term!" />
                            <button id="tagGenerator" className="btn btn-info" type="submit">Make tag</button>

                    </form>

		</nav>
	)
   
}

SearchBox.propTypes = {
    type: PropTypes.string,
}