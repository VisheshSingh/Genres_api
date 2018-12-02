const mongoose = require("mongoose");
const express = require("express");
const Router = express.Router();
const Joi = require("joi");

// SCHEMA
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// MODEL
const Customer = mongoose.model("Customer", customerSchema);

// GET ALL GENRES
Router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");

  res.send(customers);
});

// GET SINGLE GENRE
Router.get("/", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(400)
      .send("The requested genre is not available in our database records");
  res.send(customer);
});

// MAKING POST REQUEST
Router.post("/", async (req, res) => {
  // VALIDATION WITH JOI
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
  });
  customer = await customer.save();
  res.send(customer);
});

// MAKING PUT REQUEST
Router.put("/:id", async (req, res) => {
  // Validate
  // If invalid, return 400 - Bad request
  const { error } = validateCustomer(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold },
    { new: true }
  );
  // Look up for genre
  // If not existing, return 404

  if (!customer)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");

  res.send(customer);
});

//  HANDLING DELETE REQUEST
Router.delete("/:id", async (req, res) => {
  // Look up the genre
  // If not existing return 404
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The requested genre is not available in our database records");

  // return response
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(5)
      .max(50)
      .required(),
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

module.exports = Router;
