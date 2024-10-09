const winston = require('winston');
const { createLogger, transports, format } = winston;

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    // Remove the file transport in serverless environments like Netlify
    new transports.Console()  // Log to console
  ]
});

module.exports = logger;