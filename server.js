//create the server
const express = require("express");
var path = require("path");

//configure the app to use express and port
const app = express();
const PORT = 3001;

//set express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "Develop/public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

//configure app to listen on specified port above
app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
