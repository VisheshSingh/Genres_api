const express = require("express");
const Router = express.Router();
const Joi = require("joi");

const genres = [
  { id: 1, name: "educational" },
  { id: 2, name: "science facts" },
  { id: 3, name: "color theory" },
  { id: 4, name: "gaming" },
  { id: 5, name: "web development" }
];

// GET ALL GENRES
Router.get("/", (req, res) => {
  res.send(genres);
});

// GET SINGLE GENRE
Router.get("/", (req, res) => {
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(400)
      .send("The requested genre is not available in our database records");
  res.send(genre);
});

// MAKING POST REQUEST
Router.post("/", (req, res) => {
  // VALIDATION WITH JOI
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});

// MAKING PUT REQUEST
Router.put("/:id", (req, res) => {
  // Look up for genre
  // If not existing, return 404
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");

  res.send(genre);
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // If valid, update course
  genre.name = req.body.name;
  // return updated course to the client
  res.send(genre);
});

//  HANDLING DELETE REQUEST
Router.delete("/:id", (req, res) => {
  // Look up the genre
  // If not existing return 404
  const genre = genres.find(g => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");
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

module.exports = Router;
