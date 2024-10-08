const express = require('express');
const multer = require('multer');
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();
const upload = multer({ dest: 'public/uploads/' }); // Set the destination for uploads

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Media management routes
 */

/**
 * @swagger
 * /media:
 *   get:
 *     tags: 
 *       - Media
 *     summary: Get a list of all media
 *     responses:
 *       200:
 *         description: A list of media
 *       500:
 *         description: Error retrieving media
 */
router.get('/media', mediaController.getAllMedia);

/**
 * @swagger
 * /media/{id}:
 *   get:
 *     tags: 
 *       - Media
 *     summary: Get a specific media file
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the media
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Media details
 *       404:
 *         description: Media not found
 */
router.get('/media/:id', mediaController.getMediaById);

/**
 * @swagger
 * /media/upload:
 *   post:
 *     tags: 
 *       - Media
 *     summary: Upload a new media file
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: section_id
 *         in: formData
 *         description: Optional ID of the section to associate the media with
 *         required: false
 *         schema:
 *           type: integer
 *       - name: page_id
 *         in: formData
 *         description: Optional ID of the page to associate the media with
 *         required: false
 *         schema:
 *           type: integer
 *       - name: description
 *         in: formData
 *         description: Optional Description of the media
 *         required: false
 *         schema:
 *           type: string
 *       - name: file
 *         in: formData
 *         required: true
 *         description: The media file to upload
 *         schema:
 *           type: string
 *           format: binary
 *     responses:
 *       201:
 *         description: Media uploaded successfully
 *       400:
 *         description: No file uploaded or invalid section_id
 *       500:
 *         description: Error uploading media
 */
router.post('/media/upload', authMiddleware, roleMiddleware(['admin', 'editor']), upload.single('file'), mediaController.uploadMedia);

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     tags: 
 *       - Media
 *     summary: Delete a media file
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the media to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Media deleted successfully
 *       404:
 *         description: Media not found
 */
router.delete('/media/:id', authMiddleware, roleMiddleware(['admin']), mediaController.deleteMedia);

module.exports = router;
