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
  created(command, msg) {
    logger.info(
      `${command} - ${msg.author.id} - ${msg.author.username} - CREATED`
    );
  },
  // 202
  updated(command, msg) {
    logger.info(
      `${command} - ${msg.author.id} - ${msg.author.username} - UPDATED`
    );
  },
  // 204
  deleted(command, msg) {
    logger.info(
      `${command} - ${msg.author.id} - ${msg.author.username} - DELETED`
    );
  },
  // 400-403
  unauthorized(command, msg) {
    logger.warn(
      `${command} - ${msg.author.id} - ${msg.author.username} - UNAUTHORIZED`
    );
  },
  // 404
  notFound(command, msg) {
    logger.warn(
      `${command} - ${msg.author.id} - ${msg.author.username} - NOT FOUND`
    );
  },
  // 500
  error(command, msg, error) {
    logger.warn(
      `${command} - ${msg.author.id} - ${msg.author.username} - ERROR`
    );
    logger.debug(error);
  },
};
