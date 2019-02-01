import React, { Component } from 'react';
import Jumbotron from "../components/Jumbotron/index";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn/index";
import { Col, Row, Container} from "../components/Grid/index";
import { List} from "../components/List/index";
import { Input, FormBtn, FormRow } from "../components/Form/index";
import BookList from '../components/List/BookList';
// import axios from "axios";


export class Search extends Component {

    constructor(props) {

        super(props)

        this.state = {
            items : [null],
            queryObj : {
                type: "",
                
            },
            highlight : 0,
            visibility : {
                highlight: false,
                bookList: false,
                savedBook: false
            },
            savedBook :  [null],
            format: ""
        }

        this.updateQuery = this.updateQuery.bind(this);
        this.updateGeneralHighlight = this.updateGeneralHighlight.bind(this);
        this.addBook = this.addBook.bind(this);
        this.updateSavedBookHighlight = this.updateSavedBookHighlight.bind(this);
        this.updateVisiblity = this.updateVisiblity.bind(this);
        this.deleteBook = this.deleteBook.bind(this);

    }
    componentDidMount() {

        this.loadBooks();

    }
    
    componentDidUpdate() {

        console.log(this.state);

    } 
    
    loadBooks = () => {

        API.getBooks()
          .then(res => this.setState({ books: res.data, title: "", author: "" }))
          .catch(err => console.log(err));

    }; //End loadBooks
    
    // Deletes a book from the database with a given id, then reloads books from the db
    deleteBook = id => {

        API.deleteBook(id)
          .then(res => this.loadBooks())
          .catch(err => console.log(err));

    }; //End deleteBook
      
    // Handles updating component state when the user types into the input field
    handleInputChange = event => {

        const { name, value } = event.target;

        this.setState({
          [name]: value
        });

    }; //End handleInputChange
    
    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    handleFormSubmit = event => {

        event.preventDefault();

        // only if there is a value for title and autor will form submit
        // allowing books to be saved without a description
        if (this.state.title && this.state.author) {
            API.saveBook({
                title: this.state.title,
                author: this.state.author,
                description: this.state.description
            })
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
        }
    }; //End handleFormSubmit
    
    searchBooks = async e => {
        
        // from form component
        let formSearch = e.target.elements.formSearch.value;
        e.preventDefault();
        e.target.reset();

        // clear state for next search
        this.setState({ books: [] });

        // make API request
        const nytApiCall = await fetch(
            "https://api.nytimes.com/svc/books/v3/lists.json?list=" +
            formSearch +
            "&api-key=zgjpi3khaW18Goh5WSGZhszJvLz27vcf"
        );

        const data = await nytApiCall.json();

        // setState with data
        this.setState({ books: data.results });

        // to clean up form search, should use regex
        if (formSearch === 'hardcover-fiction') {
            formSearch = 'Hardcover Fiction';
        }
        if (formSearch === 'hardcover-nonfiction') {
            formSearch = 'Hardcover Nonfiction';
        }
        if (formSearch === 'combined-print-and-e-book-fiction') {
            formSearch = 'Combined Print & E-Book Fiction';
        }
        if (formSearch === 'combined-print-and-e-book-nonfiction') {
            formSearch = 'Combined Print & E-Book Nonfiction';
        }
        if (formSearch === 'paperback-nonfiction') {
            formSearch = 'Paperback Nonfiction';
        }
        if (formSearch === 'advice-how-to-and-miscellaneous') {
            formSearch = 'Advice, How-To & Miscellaneous';
        }
        if (formSearch === 'childrens-middle-grade-hardcover') {
            formSearch = "Children's Middle Grade Hardcover";
        }
        if (formSearch === 'young-adult-hardcover') {
            formSearch = 'Young Adult Hardcover';
        }
  
        this.setState({ format: formSearch });

    }; //End searchBooks

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6">
                        <Jumbotron>
                            <h1>Add a book to the list!</h1>
                        </Jumbotron>

                        <form>
                            {/* Take in book title value */}
                            <Input 
                                name="title"
                                placeholder="Title (required)"
                                value={this.state.title}
                                onChange={this.handleInputChange}
                            />

                            {/* Takes in author name values */}
                            <Input
                                name="author" 
                                placeholder="Author (required)" 
                                value={this.state.author}
                                onChange={this.handleInputChange}
                            />

                            {/* Submits all info from input bars into saved books */}
                            <FormBtn 
                            disabled={!(this.state.author && this.state.title)}
                            onClick={this.handleFormSubmit}
                            >
                                Save Book
                            </FormBtn>

                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }

}; // End Search page
