import React, { Component } from 'react';
import "../components/style.css";
import API from "../utils/API";
import {BookCard} from "../components/CustomJSX/BookCard";
import {BookList} from "../components/CustomJSX/BookList";
import {SavedList} from "../components/CustomJSX/SavedList";
import {Menu} from "../components/CustomJSX/Menu";
import {SearchBox} from "../components/CustomJSX/SearchBox";
import idb from 'idb';
import axios from 'axios';


export class App extends Component {

    constructor(props) {

        super(props)

        this.state = {
            searchPool : [null],
            queryObj : {
                type: "hardcover-fiction",
            },
            highlight : 0,
            visibility : {
                highlight: false,
                bookList: false,
                savedBook: false
            },
            savedBooks :  [null]
        }

        this.updateQuery = this.updateQuery.bind(this);
        this.updateGeneralHighlight = this.updateGeneralHighlight.bind(this);
        this.addBook = this.addBook.bind(this);
        this.updateSavedBookHighlight = this.updateSavedBookHighlight.bind(this);
        this.updateVisibility = this.updateVisibility.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

    }

    // Set state for which parts of the UI are visible
	updateVisibility(setVisibility) {
		this.setState({
			visibility: {
				highlight: setVisibility.highlight,
				bookList: setVisibility.bookList,
				savedBook: setVisibility.savedBook
			}
		});

	}

    apiSearch() {
        this.apiCall = fetch(
            "https://www.googleapis.com/books/v1/volumes?q=" + 
            this.state.queryObj.type +
            "&filter=ebooks&orderBy=relevance&maxResults=30&langRestrict=en&key=AIzaSyCMiu9BKRYCqsMEi73bivxlnUF7Ow-oQO4"
        )
        // Then have a function that gets the json version of the response
        .then(response => response.json())
        // Then give if statements for data pulled in from api to display info or give default info
        .then((data) => {
            
            data.searchPool.forEach((searchPool, i) => {
                // Each card info is held inside of a object called SearchCard
                let searchCard = {};

                // Then for each type of info pulled in if it is undefined it displays default info

                // Title
                if(typeof searchPool.item[i].volumeInfo.title != "undefined"){
                    searchCard.title = searchPool.item[i].volumeInfo.title;
                }else {
                    searchCard.title = null;
                }
                // Authors
                if(typeof searchPool.item[i].volumeInfo.authors != "undefined"){
                    searchCard.authors = searchPool.item[i].volumeInfo.authors;
                }else {
                    searchCard.authors = null;
                }
                // Description
                if(typeof searchPool.item[i].searchInfo.textSnippet != "undefined"){
                    searchCard.description = searchPool.item[i].searchInfo.textSnippet;
                }else {
                    searchCard.description = null;
                }
                // Thumbnail
                if(typeof searchPool.item[i].volumeInfo.imageLinks.thumbnail != "undefined"){
                    searchCard.thumbnail = searchPool.item[i].volumeInfo.imageLinks.thumbnail;
                }else {
                    searchCard.thumbnail = null;
                }
                // Link
                if(typeof searchPool.item[i].searchInfo.selfLink != "undefined"){
                    searchCard.link = searchPool.item[i].searchInfo.selfLink;
                }else {
                    searchCard.link = null;
                }

                // The change set state and insert a searchCard for each iteration
                this.setState(this.state.searchPool.splice(i, 1, searchCard));
            })
        }).catch((error) => {
            console.error("Error with api call App.jsx: ", error);
        });
    } // End apiSearch


    ///////////////// Functions to handle events on the page \\\\\\\\\\\\\\\\\\\\\\\\
    
    // Call function that pulls books from db
    componentDidMount() {		
        this.loadBooks();
    }

    // End api Query
    componentWillUnmount() {
		this.apiCall.abort();
    }

    // Pulls books from db
    loadBooks = () => {
        API.getBooks()
            .then(response => this.setState({ searchPool: response.data  }))
            // .catch(error = console.error(error));
    }

    // Real time update of queryObj type for searches
    updateQuery(queryObj) {
        this.setState({ 
            queryObj: {
                type: queryObj.type
            },
            visibility: {
                highlight: false,
                bookList: false,
                savedBook: false

            }
        }, () => {
            this.apiSearch();
        });
    } // End updateQuery

    // Controls the changing values of unsaved books highlighted state 
    updateGeneralHighlight(highlight) {
        // Change highlight in the state
        this.setState({
            highlight: highlight.highlight,
            // Visibility is our selector on what type of objct it is and if it is or isnt in highlight mode
            visibility: {
                highlight: true,
                bookList: true,
                savedBook: false
            }
            });
    } // End updateGeneralHighlight

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

        // Add book to searchPool array in state
        this.setState({ 
            searchPool: this.state.searchPool.filter(
                (searchPool, i) => i !== this.state.highlight
                ),
            visibility: {
                highlight: false,
                booklist: false,
                savedBook: true
            },
            // Add info into savedBooks array
            savedBooks: [...this.state.savedBooks, data]
         });


        // Use idb to have entry point for api
        const idbPromise = idb.open("savedBooks", 1, changedDB => {

            //  Create object if not exsists
            // eslint-disable-next-line
            let savedBooks = changedDB.createObjectStore("savedBooks");

        }).catch(error => {
            console.error("Open idb error: ", error);
        });


        // Add book to idb
        idbPromise.then(library => {

            // Returns a new transaction with the given mode ("readonly" or "readwrite") 
            // and scope which can be a single object store name or an array of names.
            let trade = library.transaction("savedBooks", "readwrite");

            // Returns an IDBObjectStore in the transaction's scope.
            let savedBook = trade.objectStore("savedBooks", "readwrite");
                savedBook.add(data, data.title);

        }).catch(error => {
            console.error("Add book error at idbPromise: ", error)
        }); // End dbPromise


        // use axios to post info to saved book api route
        axios.post(
            "/api/googlebooks", 
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
            savedBooks: [...remove]  
        });

        // Setup promise
        const idbPromise = idb.open("savedBooks", 1, upgradeDB => {

            // Create object store if none exsists
            // eslint-disable-next-line
            let savedBooks = upgradeDB.createObjectStore("savedBooks");

        }).catch(error => {
            console.error("removeBook in App error: ", error)
        });

        idbPromise.then(library => {
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

    
    // Actual render function to display to cilent
    render() {
        return (

            <div className="bookApp">

                <SearchBox queryObj ={this.updateQuery} /> 

                <BookCard 
                    object={this.state.visibility.savedBook ? 
                    this.state.savedBooks[this.state.highlight] :
                    this.state.searchPool[this.state.highlight]}
                        visibility={this.state.visibility}
                        addBook={this.addBook}
                        removeBook={this.deleteBook}
                />

                <BookList 
                    array={this.state.searchPool}
                    highlight={this.updateGeneralHighlight}
                    visibility={this.state.visibility.savedBook}
                />

                <SavedList 
                    data={this.state.savedBooks}
                    highlight={this.updateSavedBookHighlight}
                    visibility={this.state.visibility.savedBook}
                />

                <Menu 
                    setVisibility={this.updateVisiblity}
                    visibility={this.state.visibility}
                />
                    
            </div>
        );
    }
        
} // End App

export default App;