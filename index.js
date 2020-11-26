const express = require("express");
const app = express();
const winston = require("winston");

//  logging | routing | connecting to DB | config
require("./startup/logging")();
require("./startup/routes")(app, express);
require("./startup/db")(winston);
require("./startup/config")();
require("./startup/validation")();

// If an error occurs
// const promise = Promise.reject(new Error("Something failed miserably."));
// promise.then(() => console.log("Done"));

// port
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
