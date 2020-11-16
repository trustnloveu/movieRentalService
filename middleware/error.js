const winston = require("winston");

module.exports = function (err, req, res, next) {
  winston.log("error", err.messsage);
  // winston.error(err.messsage);
  // winston.error(err.messsage, err);

  res.status(500).send("Interner server error has occurred.");
};
