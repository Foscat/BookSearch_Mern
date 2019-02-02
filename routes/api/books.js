// const router = require("express").Router();
const express = require("express");
const app = express();
const path = require('path');
// const booksController = require("../../controllers/booksController");

// Get router
const router = express.Router();

//  Then use it to display the ui over the express server
router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../../public/index.html"))
});

// Get api info linked into router
router.get("/api", function(req, res) {
    res.send("api route connected");
});

// Now that /api has been linked set express to use the route
app.use("/api", router);

// Route library of saved books
router.route("/savedBooks")
    
    // To add book to library
    .post(function(req, res) {
        // make a constant that represents the saveBookSchema to add to the Library
        const savedBook = new SavedBookSchema();
            savedBook.title = req.body.title,
            savedBook.authors = req.body.authors,
            savedBook.description = req.body.description,
            savedBook.thumbnail = req.body.thumbnail
            savedBook.link = req.body.link

        // Actually save the object into the dband check for errors
        savedBook.save(function(err){
            if(error){
                res.send(error);
            }
            else {
                res.json({
                    message: "Book added to library",
                    savedBook: savedBook
                });
            }
        })

    })

    // Get all books from library
    .get(function(req, res) {
        savedBooks.find(function(error, savedBooks) {
            if(error){
                res.send(error);
            }
            else {
                res.json(savedBooks)
            }
        })
    })

// Route library for specific books
router.route("/savedBooks/:id")

    .delete(function(req, res) {
        savedBooks.remove({_id: req.params.id}, function(error) {
            if(error){
                res.send(error);
            }
            else {
                res.send("Book removed from library.")
            }
        })
        res.status(204).end();
    })

module.exports = router;



// { volumeInfo:{
//     title: "White Fang",
//     authors: "Jack london",
//     infoLink: "https://play.google.com/store/books/details?id=vgemBAAAQBAJ&source=gbs_api",
//     imageLinks: {
//       thumbnail: "http://books.google.com/books/content?id=vgemBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
//     }
//   },
//   searchInfo: {
//     textSnippet: "The Call of the Wild is a novel by Jack London published in 1903. The story is set in the Yukon during the 1890s Klondike Gold Rush—a period when strong sled dogs were in high demand."
//   },
  
  
// }
