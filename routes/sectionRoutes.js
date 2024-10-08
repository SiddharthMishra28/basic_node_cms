// cms-api/routes/sectionRoutes.js

const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/sectionController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Sections
 *   description: API to manage sections for pages
 */

/**
 * @swagger
 * /pages/{pageId}/sections:
 *   get:
 *     summary: Get all sections for a specific page
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         description: The ID of the page
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of sections
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   section_id:
 *                     type: integer
 *                   section_type:
 *                     type: string
 *                   content:
 *                     type: string
 *                   position:
 *                     type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/pages/:pageId/sections', sectionController.getSections);

/**
 * @swagger
 * /pages/{pageId}/sections:
 *   post:
 *     summary: Create a new section for a page (Admin/Editor)
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         description: The ID of the page
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               section_type:
 *                 type: string
 *               content:
 *                 type: string
 *               position:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 section_id:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.post('/pages/:pageId/sections', authMiddleware, roleMiddleware(['admin', 'editor']), sectionController.createSection);

/**
 * @swagger
 * /pages/{pageId}/sections/{id}:
 *   put:
 *     summary: Update a section in a page (Admin/Editor)
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         description: The ID of the page
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the section to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               section_type:
 *                 type: string
 *               content:
 *                 type: string
 *               position:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Section updated successfully
 *       500:
 *         description: Internal server error
 */
router.put('/pages/:pageId/sections/:id', authMiddleware, roleMiddleware(['admin', 'editor']), sectionController.updateSection);

/**
 * @swagger
 * /pages/{pageId}/sections/{id}:
 *   delete:
 *     summary: Delete a section from a page (Admin/Editor)
 *     tags: [Sections]
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         description: The ID of the page
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the section to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Section deleted successfully
 *       500:
 *         description: Internal server error
 */
router.delete('/pages/:pageId/sections/:id', authMiddleware, roleMiddleware(['admin', 'editor']), sectionController.deleteSection);

module.exports = router;
