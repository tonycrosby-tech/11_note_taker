//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

// Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Express set up
app.use(express.urlencoded({ extended:  true}));
app.use(express.json());
app.use(express.static("public"));

// get API notes-sends user to AJAX page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(_dirname, "./public/notes.html"));
});

// displays all notes
app.get("/api/notes", function(req, res) {
    return res.json(db);
});



//server listening
app.listen(PORT, function() {
    console.log("API listening on PORT" + PORT);
});