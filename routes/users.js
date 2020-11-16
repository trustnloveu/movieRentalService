const express = require("express");
const router = express.Router();

const _ = require("lodash");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const config = require("config");
const auth = require("../middleware/auth");

// Modeling & Defining Schema
const { User, validate } = require("../models/user");

// Get
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

// Post(Register)
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  // 1. one by one approach without Lodash
  //   user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

  // 2. with Loash
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // hsahing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  // 1. To return what you send to clients(excluding other properties)
  //   res.send({
  //     name: user.name,
  //     email: user.email,
  //   });

  // 2. To use Lodash(_)
  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
