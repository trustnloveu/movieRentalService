const winston = require("winston");
// const logger = require("./logger");

// logging levels
// error
// warn
// info
// verbose
// debug
// silly

module.exports = function (err, req, res, next) {
  // winston.log("error", err.messsage);
  // winston.error(err.messsage);
  winston.error(err.messsage, err);

  // winston.info("Something failed.");
  res.status(500).send("Something failed.");
};
