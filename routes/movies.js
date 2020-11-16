const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");

const auth = require("../middleware/auth");

const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/gerne");

// Get all
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

// Get one
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID doesn't exist.");

  res.send(movie);
});

// Post
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  // genre != genre (the genre object above also has version property that is set by MongoDB)
  // Plus, in a real world, the object might contains various ammount of properties which might be nunecessary.
  // You don't need all those properties in most cases, when embedding document inside another doucments
  // Thus, it's better to set properties, selectively and indivisually
  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

// Put
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    {
      new: true,
    }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;
