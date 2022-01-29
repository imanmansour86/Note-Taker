//create the server
const express = require("express");
var path = require("path");
const { readFromFile, readAndAppend } = require("Develop//helper/fsUtils");

//configure the app to use express and port
const PORT = process.env.port || 3001;
const app = express();

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

app.post("/api/notes", (req, res) => {
  console.log("request here is", req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
    };
    readAndAppend(newNote, "Develop/db/db.json");
    res.json("New notes added successfully");
  } else {
    res.error("Error adding notes");
  }
});

//configure app to listen on specified port above
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
