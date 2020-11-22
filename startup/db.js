const mongoose = require("mongoose");

module.exports = function (winston) {
  // connecting to DB(Only once when the propject starts)
  mongoose
    .connect("mongodb://localhost/movieRentalService", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => winston.info("Connected to MongoDB..."));
  // .catch((err) => console.log("It could not connect to MongoDB...", err));
  // the catch method will be handled by global error handleing module
};
