//Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

//Express app
const app = express();
const PORT = process.env.PORT || 3000;

//Express set up
app.use(express.urlencoded({ extended:  true}));
app.use(express.json());
app.use(express.static("public"));