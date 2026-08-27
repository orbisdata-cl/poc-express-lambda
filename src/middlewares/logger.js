const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: {
    service: process.env.SERVICE_NAME || 'poc-express-lambda',
    environment: process.env.NODE_ENV || 'development',
  },
  transports: [new winston.transports.Console()],
});

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    logger.info('request', {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - start,
    });
  });

  next();
}

module.exports = { logger, requestLogger };
