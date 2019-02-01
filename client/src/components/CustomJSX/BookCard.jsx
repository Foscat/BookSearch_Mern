import React from 'react';
import { PropTypes } from 'prop-types';
// import { MdStar } from 'react-icons/md/';
// import { MdHighlightOff } from 'react-icons/md/';
export const BookCard = ({ object, visibility, addBook, removeBook}) => {
    
    
    const addToLibrary = () => {
		addBook(object);
	};

	const removeFromLibrary = () => {
		removeBook(object);
    };

    // if(visibility.highlight) {
        
        return (
             <div className="card bookCard">
             <p>{object}</p>
             <button onClick={() => addToLibrary()}> <i className="fas fa-grin-stars"></i> Save </button> :
                <button onClick={() => removeFromLibrary()}><i className="fas fa-eraser"></i> Delete </button>
                {/* <div className="card-title bookTitle">
                    <h3>{data.title}</h3>
                </div>

                <div className="card-body">

                    <p className="bookAuthor">
                        {data.author}
                    </p>

                    <p className="bookDescription">{data.description}</p>

                    <div>

                        {visibility.savedBook ? 
                            
                        }

                    </div>
                    
                </div> */}

             </div>
        );
    
    // }

}

BookCard.propTypes = {
    data: PropTypes.object
}
