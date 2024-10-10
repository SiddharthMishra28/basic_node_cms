import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import themeRoutes from './routes/themeRoutes.js';
import pageRoutes from './routes/pageRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js'; 
import menuRoutes from './routes/menuRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import customStyleRoutes from './routes/customStyleRoutes.js';
import formRoutes from './routes/formRoutes.js';
import hyperlinkRoutes from './routes/hyperlinkRoutes.js';
import auditLogRoutes from './routes/auditLogRoutes.js';
import renderRoutes from './routes/renderRoutes.js';
import logger from './config/logger.js';

const app = express();
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB CMS API',
            version: '1.0.0',
            description: 'API documentation for the Website CMS',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
