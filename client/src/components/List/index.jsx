import React from "react";
import SaveBtn from "../SaveBtn/index";
import DeleteBtn from "../DeleteBtn/index";


// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow-container">
      <ul className="list-group">{children}</ul>
    </div>
  );
}

export const ListItem = ({ children, data, addBook, removeBook }) => {

  const addToBooks = () => {
		addBook(data);
	};

	const removeFromBooks = () => {
		removeBook(data);
	};

  return (  
    <li className="list-group-item">
      {children}

      <SaveBtn onClick={() => addToBooks()} />
      <br />
      <DeleteBtn onClick={() => removeFromBooks()} />

    </li>);
}
