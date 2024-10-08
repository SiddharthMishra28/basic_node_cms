// app.js
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const themeRoutes = require('./routes/themeRoutes');
const pageRoutes = require('./routes/pageRoutes');
const sectionRoutes = require('./routes/sectionRoutes');
const mediaRoutes = require('./routes/mediaRoutes'); 
const menuRoutes = require('./routes/menuRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const customStyleRoutes = require('./routes/customStyleRoutes');
const formRoutes = require('./routes/formRoutes');
const hyperlinkRoutes = require('./routes/hyperlinkRoutes');
const auditLogRoutes = require('./routes/auditLogRoutes');
const renderRoutes = require('./routes/renderRoutes');
const logger = require('./config/logger');

const app = express();
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB CMS API',
            version: '1.0.0',
            description: 'API documentation for Web CMS',
        },
        servers: [
            {
                url: '/',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', themeRoutes);
app.use('/api', pageRoutes);
app.use('/api', sectionRoutes);
app.use('/api', mediaRoutes);
app.use('/api', menuRoutes);
app.use('/api', settingsRoutes);
app.use('/api', customStyleRoutes);
app.use('/api', formRoutes);
app.use('/api', hyperlinkRoutes);
app.use('/api', auditLogRoutes);
app.use('/api', renderRoutes);

// Global error-handling middleware
app.use((err, req, res, next) => {
    // Log the error details using winston
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
    // Send generic error response to the client
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        status: err.status || 500
    });
});

module.exports = app;
