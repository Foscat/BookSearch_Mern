import React, { Component } from 'react';
import { Nav } from "../components/Nav";
import { BookCard } from "../components/Card/BookCard";
import { Highlight } from "../components/Highlight";
import { BookList } from "../components/Grid/BookList";
import { FormRow } from "../components/Form/index";
import idb from 'idb';
import axios from 'axios';

export class App extends Component {

    constructor(props) {

        super(props)

        this.state = {
            items : [null],
            queryObj : {
                type: "q=intitle:",
                query: "lord+of+the"
            },
            highlight : 0,
            visibility : {
                highlight: false,
                bookList: false,
                savedBook: false
            },
            savedBook :  [null]
        }

        this.updateQuery = this.updateQuery.bind(this);
        this.updateGeneralHighlight = this.updateGeneralHighlight.bind(this);
        this.addBook = this.addBook.bind(this);
        this.updateSavedBookHighlight = this.updateSavedBookHighlight.bind(this);
        this.updateVisiblity = this.updateVisiblity.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

    }


    // Get the results for the search terms entered
    apiSearch() {
        this.serverRequest = fetch(
            "https://www.googleapis.com/books/v1/volumes?" +
            this.state.queryObj.type + 
            this.state.queryObj.query
            )
            // Then have a function that gets the json version of the response
            .then(response => response.json())
            // Then give if statements for data pulled in from api to display info or give default info
            .then((data) => {
            
                data.items.forEach((item, i) => {
                    let element = {};
                    // Title
                    if (typeof item.volumeInfo.title != "undefined") { 
                        element.title = item.volumeInfo.title;
                    } else {
                        element.title = "No title info..";
                    }
                    // Authors
                    if ( typeof item.volumeInfo.authors != "undefined") {
                        element.authors =  item.volumeInfo.authors[0];
                    } else {
                        element.authors = "No author info..";
                    }
                    //  Average rating for stars
                    if ( typeof item.volumeInfo.averageRating != "undefined") {
                        element.rating =  item.volumeInfo.averageRating;
                    } else {
                        element.rating = "No rating info..";
                    }
                //  Rating count for starts
                // if ( typeof item.volumeInfo.ratingsCount != 'undefined') {
                //     element.ratingsCount =  item.volumeInfo.ratingsCount;
                // } else {
                //     element.ratingsCount = null;
                // }
                // Description
                    if ( typeof item.volumeInfo.description != "undefined") {
                        element.description = item.volumeInfo.description;
                    } else {
                        element.description = "No description..";
                    }	
                    // Image
                    if ( typeof item.volumeInfo.imageLinks != "undefined" &&
                                typeof item.volumeInfo.imageLinks.thumbnail != "undefined" ) {
                        element.thumbnail = item.volumeInfo.imageLinks.thumbnail.replace(/http:/i, "https:");
                    } else {
                        element.thumbnail = null;
                    }		
                    this.setState(this.state.items.splice(i, 1, element));
                })				
        }).catch((error) => {
            console.error("There was an error fetching data: ", error);
            });
    }

    componentDidMount() {		
        // Populate the favorites list
        axios.get("/api/savedBooks")
        .then(response =>{
            // Checks that info was actully taken in
            console.log('Info from mongodb', response.data);
            // Then changes the state of saved books to data
            this.setState({
                savedBook: response.data
            })
        }).catch(error => {
            console.error(error);
        });
    } // End componentDidMount


    // Set the current query in state on change
    updateQuery(queryObj) {
	    this.setState({
		    queryObj: {
			    type: queryObj.type,
    			query: queryObj.query
            },
            // For proper card rendering
		    visibility: {
			    highlight: false,
    			booklist: true,
	    		savedBook: false
		    	}
    		}, () => {
                // Call api search function after search params have been taken in
	    		this.apiSearch();
	            });
		
    } //End updateQuery

    // Controls the changing values of unsaved books highlighted state 
    updateGeneralHighlight(highlight) {
        // Change highlight in the state
        this.setState({
            highlight: highlight.highlight,
            // Visibility is our selector on what type of objct it is and if it is or isnt in highlight mode
            visibility: {
                highlight: true,
                booklist: true,
                savedBook: false
            }
        });
    } // End updateHighlight

    // Controls the changing values of saved books highlighted state
    updateSavedBookHighlight(highlight) {
		this.setState({
			highlight: highlight.highlight,
			visibility: {
				highlight: true,
				booklist: false,
				favorites: true
			}
		});
		
	} // End updateSavedBookHighlight

    // Allows user to save a book
    addBook(data) {

        // Add book to items array in state
        this.setState({ 
            items: this.state.items.filter(
                (item, i) => i !== this.state.highlight
                ),
            visibility: {
                highlight: false,
                booklist: false,
                savedBook: true
            },
            // Add info into savedBooks array
            savedBook: [...this.state.savedBooks, data]
         });


        // Use idb to have entry point for api
        const dbPromise = idb.open("savedBooks", 1, upgradeDB => {

            //  Create object if not exsists
            // eslint-disable-next-line
            let savedBook = upgradeDB.createObjectStore("savedBooks");

        }).catch(error => {
            console.error("Open idb error: ", error);
        });


        // Add book to idb
        dbPromise.then(library => {

            // Returns a new transaction with the given mode ("readonly" or "readwrite") 
            // and scope which can be a single object store name or an array of names.
            let trade = library.transaction("savedBooks", "readwrite");

            // Returns an IDBObjectStore in the transaction's scope.
            let savedBook = trade.objectStore("savedBooks", "readwrite");
                savedBook.add(data, data.title);

        }).catch(error => {
            console.error("Add book error: ", error)
        }); // End dbPromise


        // use axios to post info to saved book api route
        axios.post(
            "/api/savedBooks", 
            data
        ).then(function(res) {

            // Check info is good
            console.log("Axios post in App: ", res);

        }).catch(function (error) {

            console.error("Axios post in App error: ", error);

        })

    }; // End addBook


    // Remove book from library
    deleteBook(data) {

        // Make object for shorthand coding
        const remove = this.state.savedBooks;

        // get selected book and spcle it from array
        remove.splice(this.state.highlight, 1);

        // set new state
        this.setState({ 
            visibility: {
                highlight: false,
                booklist: false,
                savedBook: true,
            },
            savedBook: [...remove]  
        });

        // Setup promise
        const dbPromise = idb.open("savedBooks", 1, upgradeDB => {

            // Create object store if none exsists
            // eslint-disable-next-line
            let savedBooks = upgradeDB.createObjectStore("savedBooks");

        }).catch(error => {
            console.error("removeBook in App error: ", error)
        });

        dbPromise.then(library => {
            let trade = library.transaction("savedBooks", "readwrite");
            let savedBooks = trade.objectStore("savedBooks", "readwrite");
            savedBooks.delete(data.title);

        }).catch(error => {
            console.error("dbPromise delete in app error: ", error);
        })

        // Use axios to delete book
        axios.delete(`/api/savedBooks/${data._id}`, data)

            .then(function(res) {

                // Check that info went through
                console.log(res);

            }).catch(function(error) {

                console.error("Axios delete in App error: ", error);

            });

    } //End removeBook

    updateVisiblity(setVisibility) {

        this.setState({ 
            visibility: {
                highlight: setVisibility.highlight,
                booklist: setVisibility.booklist,
                savedBook: setVisibility.savedBook
            }  
        });

    } // End updateVisibility 
    

    // Actual render function to display to cilent
    render() {
        return (

            <div className="bookApp">

                <FormRow queryObj ={this.updateQuery} /> 

                <Highlight data={this.state.visibility.savedBook ? 
                    this.state.savedBook[this.state.highlight] :
                    this.state.items[this.state.highlight]}
                        visibility={this.state.visibility}
                        addBook={this.state.addBook}
                        removeBook={this.state.removeBook}
                />

                <BookList 
                    data={this.state.items}
                    highlight={this.updateGeneralHighlight}
                    visibility={this.state.visibility.savedBook}
                />

                <SavedBook 
                    data={this.state.savedBook}
                    highlight={this.updateSavedBookHighlight}
                    visibility={this.state.visibility.savedBook}
                />

                <Nav 
                    setVisibility={this.updateVisiblity}
                    visibility={this.state.visibility}
                />
                    
            </div>
        );
    }


} // End of App
