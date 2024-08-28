import logger from '../config/logger.js'; // Import the logger

// Middleware to log requests
const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};

// Middleware to log errors
const errorLogger = (err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next(err);
};

export { requestLogger, errorLogger };