// routes/themeRoutes.js
const express = require('express');
const {
    getThemes,
    createTheme,
    updateTheme,
    deleteTheme,
    changeThemeStatus,
} = require('../controllers/themeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

/**
 * @swagger
 * /themes:
 *   get:
 *     summary: Get a list of themes
 *     tags: [Themes]
 *     responses:
 *       200:
 *         description: A list of themes
 */
router.get('/themes', getThemes);

/**
 * @swagger
 * /themes:
 *   post:
 *     summary: Create a new theme (Admin)
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme_name:
 *                 type: string
 *               primary_color:
 *                 type: string
 *               secondary_color:
 *                 type: string
 *               font_family:
 *                 type: string
 *               font_size:
 *                 type: string
 *     responses:
 *       201:
 *         description: Theme created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/themes', authMiddleware, roleMiddleware(['admin']), createTheme);

/**
 * @swagger
 * /themes/{id}:
 *   put:
 *     summary: Update an existing theme (Admin)
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the theme to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme_name:
 *                 type: string
 *               primary_color:
 *                 type: string
 *               secondary_color:
 *                 type: string
 *               font_family:
 *                 type: string
 *               font_size:
 *                 type: string
 *     responses:
 *       200:
 *         description: Theme updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Theme not found
 */
router.put('/themes/:id', authMiddleware, roleMiddleware(['admin']), updateTheme);

/**
 * @swagger
 * /themes/{id}:
 *   delete:
 *     summary: Delete a theme (Admin)
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the theme to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Theme deleted successfully
 *       404:
 *         description: Theme not found
 */
router.delete('/themes/:id', authMiddleware, roleMiddleware(['admin']), deleteTheme);

/**
 * @swagger
 * /themes/{id}/status:
 *   patch:
 *     summary: Change the status (active/inactive) of a theme (Admin)
 *     tags: [Themes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the theme to update the status
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Theme status updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Theme not found
 */
router.patch('/themes/:id/status', authMiddleware, roleMiddleware(['admin']), changeThemeStatus);

module.exports = router;
