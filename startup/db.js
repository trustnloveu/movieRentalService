const mongoose = require("mongoose");
const config = require("config");

module.exports = function (winston) {
  const db = config.get("db");
  console.log(db);
  // connecting to DB(Only once when the propject starts)
  // "mongodb://localhost/movieRentalService"
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => winston.info(`Connected to ${db}...`));
  // .catch((err) => console.log("It could not connect to MongoDB...", err));
  // the catch method will be handled by global error handleing module
};
