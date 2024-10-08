const express = require('express');
const router = express.Router();
const renderController = require('../controllers/renderController');

/**
 * @swagger
 * /api/pages/{pageId}/render:
 *   get:
 *     summary: Render a complete page with all its contents
 *     description: Fetch and return all the details needed to render a page including logo, menus, sections, links, forms, and custom CSS.
 *     tags:
 *       - Page Rendering
 *     parameters:
 *       - in: path
 *         name: pageId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the page to be rendered
 *     responses:
 *       200:
 *         description: Successfully rendered the page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: "About Us"
 *                     slug:
 *                       type: string
 *                       example: "about-us"
 *                     meta_description:
 *                       type: string
 *                       example: "This is the about us page"
 *                     meta_keywords:
 *                       type: string
 *                       example: "about, company, us"
 *                     logo:
 *                       type: string
 *                       example: "/static_assets/logo.png"
 *                     menus:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           menu_id:
 *                             type: integer
 *                             example: 1
 *                           menu_name:
 *                             type: string
 *                             example: "Main Menu"
 *                           menu_items:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 label:
 *                                   type: string
 *                                   example: "Home"
 *                                 url:
 *                                   type: string
 *                                   example: "/home"
 *                     sections:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           section_id:
 *                             type: integer
 *                             example: 1
 *                           section_type:
 *                             type: string
 *                             example: "header"
 *                           content:
 *                             type: string
 *                             example: "<h1>Welcome</h1>"
 *                           links:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 link_id:
 *                                   type: integer
 *                                   example: 1
 *                                 label:
 *                                   type: string
 *                                   example: "Contact Us"
 *                                 url:
 *                                   type: string
 *                                   example: "/contact"
 *                     forms:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           form_id:
 *                             type: integer
 *                             example: 1
 *                           form_name:
 *                             type: string
 *                             example: "Contact Form"
 *                           fields:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 field_id:
 *                                   type: integer
 *                                   example: 1
 *                                 field_name:
 *                                   type: string
 *                                   example: "Email"
 *                                 field_type:
 *                                   type: string
 *                                   example: "email"
 *                                 is_required:
 *                                   type: boolean
 *                                   example: true
 *                     custom_css:
 *                       type: string
 *                       example: ".header { color: #000; }"
 *       500:
 *         description: Internal Server Error
 */
router.get('/pages/:pageId/render', renderController.renderPage);

module.exports = router;
