const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");

// Defining log format(not used)
// const logFormat = (info) => {
//   return `${info.timestamp} ${info.level} ${info.message}`;
// };

// logging on file(.log)
const logger = winston.createLogger({
  // default level
  level: "info",
  // format
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize({ all: true }),
    winston.format.align(),
    winston.format.prettyPrint()
  ),
  // meta
  defaultMeta: { service: "movie-rental-service" },
  // trsansports
  transports: [
    new winston.transports.File({
      filename: "logfile.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "combined.log",
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost/movieRentalService",
      options: {
        useUnifiedTopology: true,
      },
    }),
    new winston.transports.File({
      filename: "uncaughtExceptions.log",
      handleExceptions: true,
    }),
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
0;

// add transports
winston.add(logger);

// To catch errors whcih occurs outside Express. >>> This code has been included in logger transports
// process.on("uncaughtException", (ex) => {
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

process.on("unhandledRejection", (ex) => {
  winston.error(ex.message, ex);
  process.exit(1);
  // throw ex;
});
