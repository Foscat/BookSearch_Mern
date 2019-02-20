const mongoose = require("mongoose");
const db = require("../models/book");
require("dotenv").config()

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/reactreadinglist");

function apiRoutes(app) {

    // Gets all books in db
    app.get("/api/getBooks", function(req, res) {
        db.find().then(function(data, error) {
            if(error) throw error;
            console.log("Get books data route: ", data);
            res.json(data);
        });
    });

    // Deletes all books in db
    app.get("/api/deleteBooks", function(req, res) {
        db.remove().then(function(data, error) {
            if(error) throw error;
            res.json(data);
        });
    });

    // Add book to db
    app.post("/api/addBook", function(req, res) {

        const bookInfo = req.body;
        
        db.find({ apiId: bookInfo.apiId})
            .then(function(data, error) {

                // If no same book in db
                if(data.length === 0) {

                    db.books
                        .create({
                            title: bookInfo.title,
                            authors: bookInfo.authors,
                            description: bookInfo.description,
                            thumbnail: bookInfo.thumbnail,
                            link: bookInfo.link,
                            apiId: bookInfo.apiId,
                            created_at: new Date()
                        })
                        .then(function(error, data) {

                            if(error) {
                                res.send({error: "Could not add book."});
                                return;
                            }

                            res.status(200).send({
                                good: "Added book to db."
                            });
                            return;
                            console.log(data);
                        })
                }

                // if same book in bd
                res.send({ error: "Book already in db."});
                return;

            });

    });
}

module.exports = apiRoutes