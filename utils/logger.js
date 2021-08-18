// Initiate Logger
const logger = require("pino")({
  prettyPrint: {
    colorize: true,
    translateTime: true,
    ignore: "hostname,pid",
    messageFormat: `{msg}`,
  },
  level: process.env.NODE_ENV === "production" ? 30 : 20,
});

module.exports = {
  // 100
  log(msg) {
    logger.debug(msg);
  },
  // 200
  success(msg) {
    logger.info(`${msg} - SUCCESS`);
  },
  // 201
  created(msg) {
    logger.info(`${msg} - CREATED`);
  },
  // 202
  updated(msg) {
    logger.info(`${msg} - UPDATED`);
  },
  // 204
  deleted(msg) {
    logger.info(`${msg} - DELETED`);
  },
  // 400-403
  unauthorized(msg) {
    logger.warn(`${msg} - UNAUTHORIZED`);
  },
  // 404
  notFound(msg) {
    logger.warn(`${msg} - NOT FOUND`);
  },
  // 500
  error(msg, error) {
    logger.error(`${msg} - ERROR`);
  },
};
