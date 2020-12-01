// router
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const returns = require("../routes/returns");

// middleware
const error = require("../middleware/error");

module.exports = function (app, express) {
  // routing
  app.use(express.json());
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/returns", returns);
  // error middleware (passing a reference, not calling a function)
  app.use(error);
};
