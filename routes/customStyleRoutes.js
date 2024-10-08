const express = require('express');
const router = express.Router();
const customStyleController = require('../controllers/customStyleController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * /custom-styles:
 *   get:
 *     summary: Get all custom styles
 *     tags: [CustomStyles]
 *     responses:
 *       200:
 *         description: List of custom styles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   style_id:
 *                     type: integer
 *                     example: 1
 *                   css_code:
 *                     type: string
 *                     example: "body { background-color: #fff; }"
 *                   theme_id:
 *                     type: integer
 *                     example: 1
 *                   page_id:
 *                     type: integer
 *                     example: 1
 *       500:
 *         description: Server error
 */
router.get('/custom-styles', customStyleController.getAllCustomStyles);

/**
 * @swagger
 * /custom-styles:
 *   post:
 *     summary: Add a new custom style
 *     tags: [CustomStyles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               css_code:
 *                 type: string
 *                 example: "body { background-color: #000; }"
 *               theme_id:
 *                 type: integer
 *                 example: 1
 *               page_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Custom style added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/custom-styles', authMiddleware, roleMiddleware('admin'), customStyleController.addCustomStyle);

/**
 * @swagger
 * /custom-styles/{id}:
 *   put:
 *     summary: Update an existing custom style
 *     tags: [CustomStyles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               css_code:
 *                 type: string
 *               theme_id:
 *                 type: integer
 *               page_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Custom style updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.put('/custom-styles/:id', authMiddleware, roleMiddleware('admin'), customStyleController.updateCustomStyle);

/**
 * @swagger
 * /custom-styles/{id}:
 *   delete:
 *     summary: Delete an existing custom style
 *     tags: [CustomStyles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Custom style deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/custom-styles/:id', authMiddleware, roleMiddleware('admin'), customStyleController.deleteCustomStyle);

module.exports = router;
