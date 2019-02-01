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

	const categoryChange = () => {
		if (formSearch.value === 'hardcover-fiction') {
			formSearch.value = 'Hardcover Fiction';
		}
		if (formSearch.value === 'hardcover-nonfiction') {
			formSearch.value = 'Hardcover Nonfiction';
		}
		if (formSearch.value === 'combined-print-and-e-book-fiction') {
			formSearch.value = 'Combined Print & E-Book Fiction';
		}
		if (formSearch.value === 'combined-print-and-e-book-nonfiction') {
			formSearch.value = 'Combined Print & E-Book Nonfiction';
		}
		if (formSearch.value === 'paperback-nonfiction') {
			formSearch.value = 'Paperback Nonfiction';
		}
		if (formSearch.value === 'advice-how-to-and-miscellaneous') {
			formSearch.value = 'Advice, How-To & Miscellaneous';
		}
		if (formSearch.value === 'childrens-middle-grade-hardcover') {
			formSearch.value = "Children's Middle Grade Hardcover";
		}
		if (formSearch.value === 'young-adult-hardcover') {
			formSearch.value = 'Young Adult Hardcover';
		}
    }
    
    return(
		<nav aria-label="Book search form" id="book-form">

		<form onSubmit={submit}>
			<select aria-label="Drop-down list for book search category"
						  defaultValue={type} 
						  ref={option => _type = option}>
				<option name="formSearch" onClick={() => categoryChange()} value="hardcover-fiction">Hardcover Fiction</option>
                <option name="formSearch" onClick={() => categoryChange()} value="hardcover-nonfiction">Hardcover Nonfiction</option>
				<option name="formSearch" onClick={() => categoryChange()} value="combined-print-and-e-book-fiction">Combined Print and E-Book Fiction</option>
				<option name="formSearch" onClick={() => categoryChange()} value="combined-print-and-e-book-nonfiction">Combined Print and E-Book Nonfiction</option>
                <option name="formSearch" onClick={() => categoryChange()} value="paperback-nonfiction">Paperback Nonfiction</option>
                <option name="formSearch" onClick={() => categoryChange()} value="advice-how-to-and-miscellaneous">Advice, How-To and Miscellaneous</option>
                <option name="formSearch" onClick={() => categoryChange()} value="childrens-middle-grade-hardcover">Children's Middle Grade Hardcover</option>
                <option name="formSearch" onClick={() => categoryChange()} value="young-adult-hardcover">Young Adult Hardcover</option>
            </select>
			<input type="submit" value="Search"/>
		</form>
		</nav>
	)
   
}

SearchBox.propTypes = {
    title: PropTypes.string,
    author: PropTypes.string
}