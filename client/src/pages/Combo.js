import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron/index";
import API from "../utils/API";
import { Col, Row, Container} from "../components/Grid/index";
import { List, ListItem} from "../components/List/index";
import { Input, FormBtn } from "../components/Form/index";
// import Card from "../components/Card";

class Books extends Component {
  constructor(props) {

    super(props)
    this.state = {
    books: [],
    bookSearch: [],
    term: "history"
  };
}

  componentDidMount() {
    this.loadBooks();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: this.state.books}))
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
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  apiSearch = async e => {

    const apiCall = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=" + 
        this.state.term +
        "&filter=ebooks&orderBy=relevance&maxResults=30&langRestrict=en&key=AIzaSyCMiu9BKRYCqsMEi73bivxlnUF7Ow-oQO4"
    )

    // Then have a function that gets the json version of the response
    const data = await apiCall.json();

    // setState with data
    this.setState({ bookSearch: data.items })

} // End apiSearch


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1 style={{ fontFamily: "Luckiest Guy, cursive",  color: "black"}}>What Books Should I Read?</h1>
            </Jumbotron>
            <form>

              {/* Take in book term value */}
              <Input 
                name="term" 
                placeholder="Title (required)" 
                value={this.state.term}
                onChange={this.handleInputChange}
              />

              {/* Submits all info from input bars into saved books */}
              <FormBtn 
                disabled={!(this.state.term)}
                onClick={this.handleFormSubmit}
              >
                Save Book
              </FormBtn>
            </form>

            {/* Search api for books */}
            <button 
              className="btn btn-info" 
              onClick={() => this.apiSearch()}>
                Search for books
            </button>

            {this.state.books.length ? (
              <List>
                {this.state.books.map(bookCard => {
                  console.log(bookCard);
                return (
                  <ListItem key={bookCard.id}>
                    <div>
                      <h3 style={{ fontFamily: "Oswald, sans-serif",  color: "black"}}>{bookCard.volumeInfo.title}</h3>
                      <h4 style={{ fontFamily: "Noto Serif SC, serif",  color: "black"}}>By: {bookCard.volumeInfo.authors}</h4>
                    </div>

                    <div>
                    <img 
                      src={bookCard.volumeInfo.imageLinks.thumbnail} 
                      alt={bookCard.volumeInfo.title}
                    ></img>
                    </div>

                    <div>
                      <p style={{ fontFamily: "Noto Serif SC, serif",  color: "black"}} className="summary">
                        {bookCard.searchInfo ? 
                        bookCard.searchInfo.textSnippet : 
                        "There is no short discription for this book"}
                      </p>
                    </div>

                  </ListItem>
                )})}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          
          <Col size="lg-6 sm-12">
            <Jumbotron>
              <h1 style={{ fontFamily: "Luckiest Guy, cursive",  color: "black"}}>Books I've searched using cards</h1>
            </Jumbotron>
            
            {this.state.bookSearch.length ? (
              <List>
                {this.state.bookSearch.map(searchCard => {
                  // console.log(searchCard.id);
                return (
                  <ListItem key={searchCard.id}>
                    <div>
                      <h3 style={{ fontFamily: "Oswald, sans-serif",  color: "black"}}>{searchCard.volumeInfo.title}</h3>
                      <h4 style={{ fontFamily: "Noto Serif SC, serif",  color: "black"}}>By: {searchCard.volumeInfo.authors}</h4>
                    </div>

                    <div>
                    <img 
                      src={searchCard.volumeInfo.imageLinks.thumbnail} 
                      alt={searchCard.volumeInfo.title}
                    ></img>
                    </div>

                    <div>
                      <p style={{ fontFamily: "Noto Serif SC, serif",  color: "black"}} className="summary">
                        {searchCard.searchInfo ? 
                        searchCard.searchInfo.textSnippet : 
                        "There is no short discription for this book"}
                      </p>
                    </div>

                  </ListItem>
                )})}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
            
          </Col>
          
        </Row>
      </Container>
    );
  }
}


export default Books;
