const mongoose = require("mongoose");
const genres = require("./routes/genres");
const express = require("express");
const app = express();

mongoose
  .connect(
    "mongodb://localhost/vidly",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Error connecting to MongoDB..."));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("The API is available at /api/genres");
});

app.use("/api/genres", genres);

app.listen(3000, () => console.log("Listening to port 3000..."));
