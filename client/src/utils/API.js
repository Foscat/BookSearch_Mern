import axios from "axios";

export default {
  // Gets all books
  search: async (e, res) => {
   // e.preventDefault()
   console.log("test")
    const apiKey = "zgjpi3khaW18Goh5WSGZhszJvLz27vcf";
    // let author = "Steven King";
    const queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=" + apiKey;
    const result = await axios.get(queryURL);
    console.log(result)
    return result
  },
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
