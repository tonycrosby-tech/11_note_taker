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
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// displays all notes
app.get("/api/notes", (req, res) => {
    return res.json(db);
});

app.post("api/notes", (req, res) => {
    let newNote = req.body;
    newNote["id"] = db.length;
    console.log(newNote);
    db.push(newNote);
});
fs.writeFile("./public/db/db.json", JSON.stringify(db), (_, err) => {
    if (err) throw err;
    console.log("Noted");
});

// delete notes
app.delete("/api/notes/:id", (req,res) => {
    const chosenNote = req.params.id;
    console.log(chosenNote);
    console.log(db);
});

//server listening
app.listen(PORT, function() {
    console.log("API listening on PORT" + PORT);
});