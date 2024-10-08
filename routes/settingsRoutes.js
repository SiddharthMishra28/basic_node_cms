// routes/settingsRoutes.js
const express = require('express');
const { getAllSettings, updateSettingByKey, createSetting } = require('../controllers/settingsController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Settings
 *   description: API to manage application settings.
 */

/**
 * @swagger
 * /settings:
 *   get:
 *     summary: Get all settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of settings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   setting_key:
 *                     type: string
 *                   setting_value:
 *                     type: string
 *                   setting_type:
 *                     type: string
 *       500:
 *         description: Error message
 */
router.get('/settings', authMiddleware, roleMiddleware(['admin']), getAllSettings);

/**
 * @swagger
 * /settings/{key}:
 *   put:
 *     summary: Update a setting by its key
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: The key of the setting
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success message
 *       404:
 *         description: Setting not found
 *       500:
 *         description: Error message
 */
router.put('/settings/:key', authMiddleware, roleMiddleware(['admin']), updateSettingByKey);

/**
 * @swagger
 * /settings:
 *   post:
 *     summary: Create a new setting
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *               value:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [text, number, boolean, json]
 *     responses:
 *       201:
 *         description: Setting created successfully
 *       500:
 *         description: Error message
 */
router.post('/settings', authMiddleware, roleMiddleware(['admin']), createSetting);

module.exports = router;
