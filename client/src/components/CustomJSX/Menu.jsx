import React from 'react';
export const Menu = ({setVisibility, visibility}) => {
	

	const showFavorites = () => {
		console.log(visibility);
		setVisibility({
				highlight: false,
				booklist: false,
				favorites: true
			
		});
		
	}

	const showHome = () => {
		setVisibility({
			highlight: false,
			booklist: true,
			favorites: false
		});

	}

	return (
		<nav aria-label="App navigation" id="app-nav">
        
			<span>{visibility.favorites ? 
				<i className="fas fa-grin-stars"></i> : 
				<i className="far fa-grin-stars" onClick={() => showFavorites()}></i>}
            </span>

			<span>{visibility.favorites ?
				<i className="fas fa-home" onClick={() => showHome()}></i> :
			    <i className="fas fa-home"></i> }
            </span>
			
		</nav>
	)
}