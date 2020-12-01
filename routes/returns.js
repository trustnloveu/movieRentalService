const express = require("express");
const router = express.Router();
const moment = require("moment");
const Joi = require("joi");

// class
const { Rental } = require("../models/rental");
const { Movie } = require("../models/movie");

// middleware
const auth = require("../middleware/auth");
const validate = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
};

router.post("/", [auth, validate(validateReturn)], async (req, res) => {
  // no customer id
  //   if (!req.body.customerId)
  //     return res.status(400).send("customeId is not provided.");

  // no movie id
  if (!req.body.movieId)
    return res.status(400).send("movieId is not provided.");

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  // no rental object returned
  if (!rental) return res.status(404).send("Rental is not found");

  // no date when it returned
  if (rental.dateReturned)
    return res.status(400).send("Return already processed.");

  // placed on auth middleware
  // res.status(401).send("Unauthorized");

  // changing the state of rental > save
  rental.dateReturned = new Date(); // date returned
  const rentalDays = moment().diff(rental.dateOut, "days"); // date have rented > fee
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  // update movie document
  await Movie.update(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.status(200).send(rental);
});

function validateReturn(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

module.exports = router;
