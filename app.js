const Joi = require("joi");
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
    return;
  }
  res.send(genre);
});

// MAKING POST REQUEST
app.post("/api/genres", (req, res) => {
  // VALIDATION WITH JOI
  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

// MAKING PUT REQUEST
app.put("/api/genres/:id", (req, res) => {
  // Look up for genre
  // If not existing, return 404
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    // BAD REQUEST
    res
      .status(404)
      .send("The requested genre is not available in our database records");
    return;
  }
  res.send(genre);
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateGenre(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // If valid, update course
  genre.name = req.body.name;
  // return updated course to the client
  res.send(genre);
});

//  HANDLING DELETE REQUEST
app.delete("/api/genres/:id", (req, res) => {
  // Look up the genre
  // If not existing return 404
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre) {
    // BAD REQUEST
    res
      .status(404)
      .send("The requested genre is not available in our database records");
    return;
  }
  res.send(genre);

  // Delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  // return response
  res.send(genre);
});

function validateGenre(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

app.listen(3000, () => console.log("Listening to port 3000..."));
