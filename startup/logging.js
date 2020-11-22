const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

// logging on file(.log)
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "movie-rental-service" },
  transports: [
    new winston.transports.File({ filename: "logfile.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// If it's in production stage, display on console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

// add transports
winston.add(logger);

winston.add(
  new winston.transports.MongoDB({
    level: "info",
    db: "mongodb://localhost/movieRentalService",
    options: {
      useUnifiedTopology: true,
    },
  })
);

winston.add(
  new winston.transports.File({
    level: "info",
    filename: "uncaughtExceptions.log",
    handleExceptions: true,
  })
);

winston.add(
  new winston.transports.Console({
    colorize: true,
    prettyPrint: true,
  })
);

// to catch errors whcih occurs outside Express
// process.on("uncaughtException", (ex) => {
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
  // throw ex;
});
