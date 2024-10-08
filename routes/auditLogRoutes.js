const express = require('express');
const router = express.Router();
const auditLogController = require('../controllers/auditLogController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * /audit-logs:
 *   get:
 *     summary: Get all audit logs
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of audit logs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   log_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 2
 *                   action:
 *                     type: string
 *                     example: "Created page"
 *                   details:
 *                     type: string
 *                     example: "User created a new page with ID 3"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-07T12:00:00Z"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/', authMiddleware, auditLogController.getAllAuditLogs);

/**
 * @swagger
 * /audit-logs/{id}:
 *   get:
 *     summary: Get a specific audit log by ID
 *     tags: [Audit Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID of the audit log to retrieve
 *     responses:
 *       200:
 *         description: Audit log details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 log_id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 2
 *                 action:
 *                   type: string
 *                   example: "Created page"
 *                 details:
 *                   type: string
 *                   example: "User created a new page with ID 3"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-10-07T12:00:00Z"
 *       404:
 *         description: Audit log not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/:id', authMiddleware, auditLogController.getAuditLogById);

module.exports = router;
