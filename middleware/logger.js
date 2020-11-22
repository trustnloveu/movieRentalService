const winston = require("winston");
require("winston-mongodb");

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

// if it's in production stage, display on console
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

winston.add(logger);

// logging in DB table(log)
winston.add(
  new winston.transports.MongoDB({
    level: "info",
    db: "mongodb://localhost/movieRentalService",
  })
);
