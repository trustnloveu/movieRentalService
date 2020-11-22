const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("express-async-errors");
// const winston = require("winston");
require("./middleware/logger");

// middleware
const error = require("./middleware/error");

// validation for ID properties
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// router
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

// routing
app.use(express.json());
app.use("/api/movies", movies);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

// error middleware (passing a reference, not calling a function)
app.use(error);

// winston
// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   defaultMeta: { service: "movie-rental-service" },
//   transports: [
//     new winston.transports.File({ filename: "logfile.log", level: "error" }),
//     new winston.transports.File({ filename: "combined.log" }),
//   ],
// });

// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

// config
const config = require("config");
if (!config.get("jwtPrivateKey")) {
  console.log("Fatal Error: jwtPrivateKey is not defined.");
  process.exit(1);
}

// connecting to DB(Only once when the propject starts)
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("It could not connect to MongoDB...", err));

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
