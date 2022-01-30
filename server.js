//create the server
const express = require("express");
var path = require("path");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./Develop/helper/fsUtils.js");

const { v4: uuid } = require("uuid");

//configure the app to use express and port
const PORT = process.env.PORT || 3000;
const app = express();

//set express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/Develop/public"));

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

  console.log("req id", uuid());
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    readAndAppend(newNote, "Develop/db/db.json");
    res.json("New notes added successfully");
  } else {
    res.error("Error adding notes");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  //read from file to see all data
  readFromFile("Develop/db/db.json").then((jsonString) => {
    const allData = JSON.parse(jsonString); //parse the data to array format
    console.log("allData", allData);
    var indexToRemove = allData
      .map(function (item) {
        return item.id;
      })
      .indexOf(req.params.id); //find the index of :id
    console.log("i", indexToRemove);
    if (indexToRemove === -1) {
      res.statusCode = 404;
      return res.send("Error 404: No id found");
    }
    // remove the object with that id
    var result = allData.splice(indexToRemove, 1);
    console.log("result is", result);

    writeToFile("Develop/db/db.json", allData);
    res.json("Delete done successfully");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

//configure app to listen on specified port above
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
