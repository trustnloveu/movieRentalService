const express = require("express");
const app = express();
const winston = require("winston");

//  logging | routing | connecting to DB | config
require("./startup/logging");
require("./startup/routes")(app, express);
require("./startup/db")(winston);
require("./startup/config")();
require("./startup/validation")();

console.log(
  `I'm now executing the app in '${process.env.NODE_ENV}' environment.`
);
// If an error occurs
// const promise = Promise.reject(new Error("Something failed miserably."));
// promise.then(() => console.log("Done"));

// port
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
