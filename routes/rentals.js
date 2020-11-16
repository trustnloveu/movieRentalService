const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Fawn = require("fawn");
const auth = require("../middleware/auth");

Fawn.init(mongoose);

// resource of schema
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");

// Get all
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

// Post
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // this code will be included in the validate() (= validtaeRental) above
  // if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
  //   return res.status(400).send("Invalid customer");

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res(404).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie");

  if (movie.numberInStock === 0)
    return res.status(400).send("The movie is not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // transation is needed   >   tow face commit
  // With transation, you can ensure both rental and movie will update the state of data in database.
  // Or, none of them will be applied. They are atomic
  // Two of operations will both complete or both roll-back

  /*
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();
  */
  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

module.exports = router;
