const express = require("express");
const router = express.Router();

// Middleware(Authentication, Authorization, async)
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
// const asyncMiddleware = require("../middleware/async");

// Modeling & Defining Schema
const { Genre, validate } = require("../models/gerne");

// GET All
router.get("/", async (req, res) => {
  // throw new Error("Error testing");
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// GET Single
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// POST
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({ name: req.body.name });
  genre = await genre.save(); // ID property will be added when the result comes out

  res.send(genre);
});

// PUT
router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

// DELETE
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
