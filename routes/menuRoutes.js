const express = require('express');
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/menus:
 *   get:
 *     summary: Get all menus
 *     tags: [Menus]
 *     responses:
 *       200:
 *         description: List of menus
 *       500:
 *         description: Server error
 */
router.get('/menus', menuController.getAllMenus);

/**
 * @swagger
 * /api/menus:
 *   post:
 *     summary: Create a new menu
 *     tags: [Menus]
 *     requestBody:
 *       description: Menu details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menu_name:
 *                 type: string
 *               menu_position:
 *                 type: string
 *                 enum: [header, footer, sidebar]
 *               theme_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Menu created
 *       500:
 *         description: Server error
 */
router.post('/menus', authMiddleware, roleMiddleware(['admin']), menuController.createMenu);

/**
 * @swagger
 * /api/menus/{id}:
 *   put:
 *     summary: Update an existing menu
 *     tags: [Menus]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Menu details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               menu_name:
 *                 type: string
 *               menu_position:
 *                 type: string
 *                 enum: [header, footer, sidebar]
 *               theme_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Menu updated
 *       500:
 *         description: Server error
 */
router.put('/menus/:id', authMiddleware, roleMiddleware(['admin']), menuController.updateMenu);

/**
 * @swagger
 * /api/menus/{id}:
 *   delete:
 *     summary: Delete a menu
 *     tags: [Menus]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu deleted
 *       500:
 *         description: Server error
 */
router.delete('/menus/:id', authMiddleware, roleMiddleware(['admin']), menuController.deleteMenu);

/**
 * @swagger
 * /api/menus/{menuId}/items:
 *   get:
 *     summary: Get all items in a menu
 *     tags: [Menu Items]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of menu items
 *       500:
 *         description: Server error
 */
router.get('/menus/:menuId/items', menuController.getMenuItems);

/**
 * @swagger
 * /api/menus/{menuId}/items:
 *   post:
 *     summary: Add an item to a menu
 *     tags: [Menu Items]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Menu item details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               url:
 *                 type: string
 *               parent_id:
 *                 type: integer
 *               position:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Menu item added
 *       500:
 *         description: Server error
 */
router.post('/menus/:menuId/items', authMiddleware, roleMiddleware(['admin']), menuController.addMenuItem);

/**
 * @swagger
 * /api/menus/{menuId}/items/{itemId}:
 *   put:
 *     summary: Update a menu item
 *     tags: [Menu Items]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Menu item details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               url:
 *                 type: string
 *               parent_id:
 *                 type: integer
 *               position:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Menu item updated
 *       500:
 *         description: Server error
 */
router.put('/menus/:menuId/items/:itemId', authMiddleware, roleMiddleware(['admin']), menuController.updateMenuItem);

/**
 * @swagger
 * /api/menus/{menuId}/items/{itemId}:
 *   delete:
 *     summary: Delete a menu item
 *     tags: [Menu Items]
 *     parameters:
 *       - name: menuId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Menu item deleted
 *       500:
 *         description: Server error
 */
router.delete('/menus/:menuId/items/:itemId', authMiddleware, roleMiddleware(['admin']), menuController.deleteMenuItem);

module.exports = router;
