import React, { Component } from 'react';

import axios from "axios";


export class NewApp extends Component {

    constructor(props) {

        super(props)

        this.state = {
            items : [null],
            queryObj : {
                type: "hardcover-fiction",
                
            },
            highlight : 0,
            visibility : {
                highlight: false,
                bookList: false,
                savedBook: false
            },
            savedBook :  [null],
        }

        this.updateQuery = this.updateQuery.bind(this);
        this.updateGeneralHighlight = this.updateGeneralHighlight.bind(this);
        this.addBook = this.addBook.bind(this);
        this.updateSavedBookHighlight = this.updateSavedBookHighlight.bind(this);
        this.updateVisiblity = this.updateVisiblity.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

    }

    fetchQuery() {
        this.serverRequest = fetch(
            "https://api.nytimes.com/svc/books/v3/lists.json?list=" +
            this.state.queryObj.type  +
            "&api-key=zgjpi3khaW18Goh5WSGZhszJvLz27vcf"
        )
        .then(response => response.json())
        .then((data) => {
            data.items.forEach((item, i) => {
                       
                // to clean up form search, should use regex
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
  
            
        })
    }
}