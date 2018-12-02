const mongoose = require("mongoose");
const Joi = require("joi");

// SCHEMA
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// MODEL
const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;
