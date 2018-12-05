const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./genre");

// SCHEMA
const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  genre: {
    type: genreSchema,
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
  }
});

// MODEL
const Movie = mongoose.model("Movie", moviesSchema);

function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(5)
      .max(255)
      .required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.string()
      .min(0)
      .required(),
    dailyRentalRate: Joi.string()
      .min(0)
      .required()
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;
