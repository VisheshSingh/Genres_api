const express = require("express");
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: "educational" },
  { id: 2, name: "science facts" },
  { id: 3, name: "color theory" },
  { id: 4, name: "gaming" },
  { id: 5, name: "web development" }
];

app.get("/", (req, res) => {
  res.send("The API is available at /api/genres");
});

// GET ALL GENRES
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// GET SINGLE GENRE
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    // BAD REQUEST
    res
      .status(400)
      .send("The requested genre is not available in our database records");
  }
  res.send(genre);
});

app.listen(3000, () => console.log("Listening to port 3000..."));
