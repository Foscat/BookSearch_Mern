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
    bookSearch: []
  };

  componentDidMount() {
    this.loadBooks();
  }

  componentDidUpdate() {
    console.log(this.state);
  }
  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  searchBooks = () => {
    console.log(API.search())
    API.search()
      .then(res => this.setState(
        { bookSearch: res.data.results.books}
        )
      )
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
              <Input name="title" placeholder="Title (required)" />
              <Input name="author" placeholder="Author (required)" />
              <FormBtn onClick={() => API.search()}>Submit Book</FormBtn>
            </form>
            <button onClick={() => this.searchBooks()}>Search</button>
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
