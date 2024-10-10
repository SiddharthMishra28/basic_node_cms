import express from 'express';
import { getAllHyperlinks, createHyperlink, deleteHyperlink } from '../controllers/hyperlinkController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/pages/{pageId}/sections/{sectionId}/links:
 *   get:
 *     summary: Get all hyperlinks for a specific section
 *     tags: [Hyperlinks]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the page
 *       - in: path
 *         name: sectionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the section
 *     responses:
 *       200:
 *         description: A list of hyperlinks
 *       500:
 *         description: Failed to retrieve hyperlinks
 */
router.get('/pages/:pageId/sections/:sectionId/links', getAllHyperlinks);

/**
 * @swagger
 * /api/pages/{pageId}/sections/{sectionId}/links:
 *   post:
 *     summary: Create a new hyperlink in a section
 *     tags: [Hyperlinks]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the page
 *       - in: path
 *         name: sectionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *                 example: "Contact Us"
 *               url:
 *                 type: string
 *                 example: "https://example.com/contact"
 *               target:
 *                 type: string
 *                 enum: ["_self", "_blank"]
 *                 example: "_blank"
 *     responses:
 *       201:
 *         description: Hyperlink created successfully
 *       500:
 *         description: Failed to create hyperlink
 */
router.post('/pages/:pageId/sections/:sectionId/links', authMiddleware, roleMiddleware(['admin', 'editor']), createHyperlink);

/**
 * @swagger
 * /api/pages/{pageId}/sections/{sectionId}/links/{linkId}:
 *   delete:
 *     summary: Delete a hyperlink from a section
 *     tags: [Hyperlinks]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the page
 *       - in: path
 *         name: sectionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the section
 *       - in: path
 *         name: linkId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the hyperlink
 *     responses:
 *       200:
 *         description: Hyperlink deleted successfully
 *       500:
 *         description: Failed to delete hyperlink
 */
router.delete('/pages/:pageId/sections/:sectionId/links/:linkId', authMiddleware, roleMiddleware(['admin']), deleteHyperlink);

export default router;
