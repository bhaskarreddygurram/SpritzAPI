import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    // Check if the message is an object and convert it to a string
    const logMessage = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
    return `${timestamp} ${level}: ${logMessage}`;
});

export const logger = createLogger({
    level: 'info', // Default logging level
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        colorize(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' })
    ]
});

export default logger;