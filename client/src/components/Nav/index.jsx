import React from 'react';
import { FaHome } from 'react-icons/fa/';
import { MdStar } from 'react-icons/md/';

export const Nav = ({setVisibility, visibility}) => {

    const showSavedBooks = () => {
        console.log(visibility);
        setVisibility({
            highlight: false,
            bookList: false,
            savedBooks: true
        });
    } // End showSavedBooks

    const showHome = () => {
        setVisibility({
            highlight: false,
            bookList: true,
            savedBooks: false
        });
    } //End showHome

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <a className="navbar-brand" href="https://github.com/Foscat/BookSearch_Mern">
                React Reading List
            </a>

            <span>{visibility.savedBooks ? 
				<MdStar /> : 
				<MdStar onClick={() => showSavedBooks()}/>}
            </span>

            <span>{visibility.savedBooks
            ?
				<FaHome onClick={() => showHome()}/> :
			    <FaHome/> }
            </span>
			
        </nav>
    )
}