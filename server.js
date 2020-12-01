//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

// Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Express set up
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

let notes = [
  {
    title: "Test Title",
    text: "Test text",
  },
  {
    title: "Test Title",
    text: "Test text",
  },
];

function getNotes(path, encoding) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, encoding, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

function setNotes(path, content, encoding) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(path, content, encoding, function (err) {
      if (err) {
        return reject(err);
      }
    });
  });
}

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// displays all notes
app.get("/api/notes", (req, res) => {
  getNotes(path.join(__dirname, "db", "db.json"), "utf8")
    .then(function (allNotes) {
      return res.json(allNotes);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// get new note
app.post("/api/notes", function (req, res) {
  const newNote = req.body;

  getNotes(path.join(__dirname, "db", "db.json"), "utf8")
    .then((allNotes) => {
      newNote.id = allNotes.length;
      allNotes.push(newNote);
      setNotes(
        path.join(__dirname, "db", "db.json"),
        JSON.stringify(allNotes),
        "utf8"
      )
        .then(() => {
          return res.json(allNotes);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});

// delete notes
app.delete("/api/notes/:id", function (req, res) {
  const thisNote = req.body;
  getNotes(path.join(__dirname, "db", "db.json"), "utf8")
    .then((allNotes) => {
      allNotes.splice(thisNote.id, 1);
      setNotes(
        path.join(__dirname, "db", "db.json"),
        JSON.stringify(allNotes),
        "utf8"
      )
        .then(() => {
          return res.json(allNotes);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});

//server listening
app.listen(PORT, function () {
  console.log("API listening on PORT" + PORT);
});
