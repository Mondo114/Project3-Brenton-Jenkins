const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post('/login', function(req, res){
  console.log("hello")
  console.log(req)
  res.end();
})

app.get("/api/nyt", function(req, res) {
  console.log("hello"); //get your articles
  res.send("data is back from backend") //send that to front end
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
