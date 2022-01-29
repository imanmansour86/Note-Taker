//create the server
const express = require("express");
var path = require("path");
const fs = require("fs");
const util = require("util");
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

//configure the app to use express and port
const app = express();
const PORT = 3001;

//set express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "Develop/public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  readFromFile("Develop/db/db.json").then((data) => res.json(JSON.parse(data)));
});

//configure app to listen on specified port above
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
