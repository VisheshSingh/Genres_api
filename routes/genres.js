const express = require("express");
const Router = express.Router();
const { Genre, validate } = require("../models/genre");

// GET ALL GENRES
Router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// GET SINGLE GENRE
Router.get("/", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res
      .status(400)
      .send("The requested genre is not available in our database records");
  res.send(genre);
});

// MAKING POST REQUEST
Router.post("/", async (req, res) => {
  // VALIDATION WITH JOI
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});

// MAKING PUT REQUEST
Router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  // Look up for genre
  // If not existing, return 404

  if (!genre)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");

  res.send(genre);
});

//  HANDLING DELETE REQUEST
Router.delete("/:id", async (req, res) => {
  // Look up the genre
  // If not existing return 404
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");

  // return response
  res.send(genre);
});

module.exports = Router;
