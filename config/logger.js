import { createLogger, format, transports } from 'winston';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define the logs directory
const logDir = path.join(__dirname,'../', 'logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Create a custom format for logs
const logFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Define the logger configuration
const logger = createLogger({
    level: 'error', // Set logging level
    format: logFormat,
    transports: [
        // Write logs to a file
        new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
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
        new transports.File({ filename: path.join(logDir, 'exceptions.log') })
    ],
    rejectionHandlers: [
        // Handle unhandled promise rejections
        new transports.File({ filename: path.join(logDir, 'rejections.log') })
    ]
});

export default logger;
