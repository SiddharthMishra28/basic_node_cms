// routes/userRoutes.js
const express = require('express');
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of users (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/users', authMiddleware, roleMiddleware(['admin']), getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get details of a specific user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/users/:id', authMiddleware, roleMiddleware(['admin']), getUserById);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, editor, viewer]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put('/users/:id', authMiddleware, roleMiddleware(['admin']), updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user (Admin)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', authMiddleware, roleMiddleware(['admin']), deleteUser);

module.exports = router;
