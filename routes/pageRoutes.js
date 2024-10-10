import express from 'express';
import PageController from '../controllers/pageController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pages
 *   description: Page management for the CMS
 */

/**
 * @swagger
 * /pages:
 *   get:
 *     summary: Get all pages
 *     tags: [Pages]
 *     responses:
 *       200:
 *         description: List of all pages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   page_id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   slug:
 *                     type: string
 *                   content:
 *                     type: string
 *                   meta_description:
 *                     type: string
 *                   meta_keywords:
 *                     type: string
 *                   is_published:
 *                     type: boolean
 *               example:
 *                 - page_id: 1
 *                   title: "Homepage"
 *                   slug: "homepage"
 *                   content: "<h1>Welcome to our website</h1>"
 *                   meta_description: "This is the homepage"
 *                   meta_keywords: "home, welcome"
 *                   is_published: true
 */
router.get('/pages', PageController.getPages);

/**
 * @swagger
 * /pages/{slug}:
 *   get:
 *     summary: Get a page by slug
 *     tags: [Pages]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The slug of the page
 *     responses:
 *       200:
 *         description: Page data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page_id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 content:
 *                   type: string
 *                 meta_description:
 *                   type: string
 *                 meta_keywords:
 *                   type: string
 *                 is_published:
 *                   type: boolean
 *               example:
 *                 page_id: 1
 *                 title: "Homepage"
 *                 slug: "homepage"
 *                 content: "<h1>Welcome to our website</h1>"
 *                 meta_description: "This is the homepage"
 *                 meta_keywords: "home, welcome"
 *                 is_published: true
 *       404:
 *         description: Page not found
 */
router.get('/pages/:slug', PageController.getPageBySlug);

/**
 * @swagger
 * /pages:
 *   post:
 *     summary: Create a new page
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *               meta_description:
 *                 type: string
 *               meta_keywords:
 *                 type: string
 *               is_published:
 *                 type: boolean
 *             example:
 *               title: "Contact Us"
 *               slug: "contact-us"
 *               content: "<h1>Contact us at our email</h1>"
 *               meta_description: "Contact page"
 *               meta_keywords: "contact, support"
 *               is_published: true
 *     responses:
 *       201:
 *         description: Page created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/pages', authMiddleware, roleMiddleware(['admin', 'editor']), PageController.createPage);

/**
 * @swagger
 * /pages/{id}:
 *   put:
 *     summary: Update an existing page
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The page ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *               meta_description:
 *                 type: string
 *               meta_keywords:
 *                 type: string
 *               is_published:
 *                 type: boolean
 *             example:
 *               title: "Updated Contact Us"
 *               slug: "updated-contact-us"
 *               content: "<h1>Updated contact info</h1>"
 *               meta_description: "Updated contact page"
 *               meta_keywords: "contact, support, update"
 *               is_published: true
 *     responses:
 *       200:
 *         description: Page updated successfully
 *       404:
 *         description: Page not found
 */
router.put('/pages/:id', authMiddleware, roleMiddleware(['admin', 'editor']), PageController.updatePage);

/**
 * @swagger
 * /pages/{id}:
 *   delete:
 *     summary: Delete a page
 *     tags: [Pages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The page ID
 *     responses:
 *       200:
 *         description: Page deleted successfully
 *       404:
 *         description: Page not found
 */
router.delete('/pages/:id', authMiddleware, roleMiddleware(['admin']), PageController.deletePage);

export default router;
