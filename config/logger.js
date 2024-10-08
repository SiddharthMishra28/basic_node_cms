// config/logger.js

const { createLogger, format, transports } = require('winston');
const path = require('path');

// Create a custom format for logs
const logFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Define the logger configuration
const logger = createLogger({
    level: 'error', // Set logging level
    format: logFormat,
    transports: [
        // Write logs to a file
        new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
        // Console logging (optional)
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ],
    exceptionHandlers: [
        // Handle uncaught exceptions and log them
        new transports.File({ filename: path.join(__dirname, '../logs/exceptions.log') })
    ],
    rejectionHandlers: [
        // Handle unhandled promise rejections
        new transports.File({ filename: path.join(__dirname, '../logs/rejections.log') })
    ]
});

module.exports = logger;
