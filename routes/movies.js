const express = require("express");
const Router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

// GET ALL GENRES
Router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");

  res.send(movies);
});

// GET SINGLE GENRE
Router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie)
    return res
      .status(404)
      .send("The requested movie is not available in our database records");
  res.send(movie);
});

// MAKING POST REQUEST
Router.post("/", async (req, res) => {
  // VALIDATION WITH JOI
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // FIND GENRE BY ID
  const genre = Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");

  let movie = new Movie({
    title: req.body.title,
    genre: {
      name: genre.name,
      _id: genre._id
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  movie = await movie.save();
  res.send(movie);
});

// MAKING PUT REQUEST
Router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        name: genre.name,
        _id: genre._id
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate
    },
    { new: true }
  );
  // Look up for genre
  // If not existing, return 404

  if (!movie)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");

  res.send(movie);
});

//  HANDLING DELETE REQUEST
Router.delete("/:id", async (req, res) => {
  // Look up the genre
  // If not existing return 404
  const movie = await Movie.findByIdAndRemove(req.params.id);
  if (!movie)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");

  // return response
  res.send(movie);
});

module.exports = Router;
