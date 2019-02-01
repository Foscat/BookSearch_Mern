import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/index";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn/index";
import { Col, Row, Container} from "../components/Grid/index";
import { List} from "../components/List/index";
import { Input, FormBtn } from "../components/Form/index";
import Card from "../components/Card";

class Books extends Component {
  state = {
    books: [],
    bookSearch: [],
    title: "",
    author: ""
  };

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
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };
  
  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

    // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  searchBooks = () => {
    console.log(API.search())
    API.search()
      .then(res => this.setState({ bookSearch: res.data.results.books}))
      .catch(err => console.log(err));
      console.log(this.state.bookSearch);
      // console.log(res.data.results.books);
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
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

            {/* Search api for books */}
            <button 
              className="btn btn-info" 
              onClick={() => this.searchBooks()}>
                Search for books
            </button>

          </Col>
          
          <Col size="lg-6 sm-12">
            <Jumbotron>
              <h1>Books I've searched using cards</h1>
            </Jumbotron>
            <List>
            {this.state.bookSearch.length ? (
              <div>
                {this.state.bookSearch.map(booksearch => {
                  console.log(booksearch.primary_isbn10);
                return (
                  <Card className="m-5 p-5" key={booksearch.primary_isbn10}>
                    <div className="card-title">
                      <h3>{booksearch.title}</h3>
                      <h5>{booksearch.author}</h5>
                    </div>

                    <div className="card-img-top">
                    <img 
                      src={booksearch.book_image} 
                      alt={booksearch.title}
                    ></img>
                    </div>

                    <div className="card-body">
                      <p className="summary">{booksearch.description}</p>
                    </div>
                    <DeleteBtn />
                  </Card>
                )})}
              </div>
            ) : (
              <h3>No Results to Display</h3>
            )}
            </List>
          </Col>
          
        </Row>
      </Container>
    );
  }
}


export default Books;
