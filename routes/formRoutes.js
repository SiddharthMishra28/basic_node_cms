const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

/**
 * @swagger
 * tags:
 *   name: Forms
 *   description: API for managing forms
 */

/**
 * @swagger
 * /forms:
 *   get:
 *     summary: Get all forms
 *     tags: [Forms]
 *     description: Retrieve a list of all forms
 *     responses:
 *       200:
 *         description: List of forms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   form_id:
 *                     type: integer
 *                     description: The form ID
 *                   form_name:
 *                     type: string
 *                     description: The form name
 *                   description:
 *                     type: string
 *                     description: The form description
 *             example:
 *               - form_id: 1
 *                 form_name: "Contact Us"
 *                 description: "User contact form"
 *               - form_id: 2
 *                 form_name: "Feedback"
 *                 description: "Feedback collection form"
 *   post:
 *     summary: Create a new form
 *     tags: [Forms]
 *     security:
 *       - BearerAuth: []
 *     description: Create a new form by providing form name and description
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formName:
 *                 type: string
 *                 description: The form name
 *               description:
 *                 type: string
 *                 description: The form description
 *             example:
 *               formName: "Survey"
 *               description: "User feedback survey form"
 *     responses:
 *       201:
 *         description: Form created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 formId:
 *                   type: integer
 *                   description: The ID of the created form
 *             example:
 *               formId: 3
 */
router.get('/forms', authMiddleware, formController.getAllForms);
router.post('/forms', authMiddleware, roleMiddleware(['admin', 'editor']), formController.createForm);

/**
 * @swagger
 * /forms/{id}:
 *   put:
 *     summary: Update an existing form
 *     tags: [Forms]
 *     security:
 *       - BearerAuth: []
 *     description: Update a form by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The form ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               formName:
 *                 type: string
 *                 description: The new form name
 *               description:
 *                 type: string
 *                 description: The new form description
 *             example:
 *               formName: "Updated Form Name"
 *               description: "Updated form description"
 *     responses:
 *       200:
 *         description: Form updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updated:
 *                   type: integer
 *                   description: Number of records updated
 *             example:
 *               updated: 1
 *   delete:
 *     summary: Delete a form
 *     tags: [Forms]
 *     security:
 *       - BearerAuth: []
 *     description: Delete a form by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The form ID
 *     responses:
 *       204:
 *         description: Form deleted successfully
 */
router.put('/forms/:id', authMiddleware, roleMiddleware(['admin', 'editor']), formController.updateForm);
router.delete('/forms/:id', authMiddleware, roleMiddleware(['admin']), formController.deleteForm);

/**
 * @swagger
 * /forms/{formId}/fields:
 *   get:
 *     summary: Get all fields for a specific form
 *     tags: [Forms]
 *     description: Retrieve all fields for a given form
 *     parameters:
 *       - in: path
 *         name: formId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The form ID
 *     responses:
 *       200:
 *         description: List of form fields
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   field_id:
 *                     type: integer
 *                   field_name:
 *                     type: string
 *                   field_type:
 *                     type: string
 *                   is_required:
 *                     type: boolean
 *                   position:
 *                     type: integer
 *             example:
 *               - field_id: 1
 *                 field_name: "Email"
 *                 field_type: "text"
 *                 is_required: true
 *                 position: 1
 *               - field_id: 2
 *                 field_name: "Message"
 *                 field_type: "textarea"
 *                 is_required: true
 *                 position: 2
 *   post:
 *     summary: Add a new field to a form
 *     tags: [Forms]
 *     security:
 *       - BearerAuth: []
 *     description: Add a new field to a specified form by providing field details
 *     parameters:
 *       - in: path
 *         name: formId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The form ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldName:
 *                 type: string
 *                 description: The name of the form field
 *               fieldType:
 *                 type: string
 *                 description: The type of the field (e.g., text, textarea)
 *               isRequired:
 *                 type: boolean
 *                 description: Whether the field is required
 *               position:
 *                 type: integer
 *                 description: The position of the field in the form
 *             example:
 *               fieldName: "Email"
 *               fieldType: "text"
 *               isRequired: true
 *               position: 1
 *     responses:
 *       201:
 *         description: Field added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fieldId:
 *                   type: integer
 *                   description: The ID of the created field
 *             example:
 *               fieldId: 1
 */
router.get('/forms/:formId/fields', formController.getFormFields);
router.post('/forms/:formId/fields', authMiddleware, roleMiddleware(['admin', 'editor']), formController.addFormField);

/**
 * @swagger
 * /forms/{formId}/fields/{fieldId}:
 *   delete:
 *     summary: Remove a field from a form
 *     tags: [Forms]
 *     security:
 *       - BearerAuth: []
 *     description: Delete a field from a specific form
 *     parameters:
 *       - in: path
 *         name: formId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The form ID
 *       - in: path
 *         name: fieldId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The field ID
 *     responses:
 *       204:
 *         description: Field deleted successfully
 */
router.delete('/forms/:formId/fields/:fieldId', authMiddleware, roleMiddleware(['admin', 'editor']), formController.deleteFormField);

/**
 * @swagger
 * /forms/{formId}/submit:
 *   post:
 *     summary: Submit a form
 *     tags: [Forms]
 *     description: Submit a specific form by its ID
 *     parameters:
 *       - in: path
 *         name: formId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The form ID
 *     responses:
 *       201:
 *         description: Form submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 submissionId:
 *                   type: integer
 *                   description: The ID of the form submission
 *             example:
 *               submissionId: 123
 */
router.post('/forms/:formId/submit', formController.submitForm);

/**
 * @swagger
 * /forms/{formId}/submissions:
 *   get:
 *     summary: Get all submissions for a specific form
 *     tags: [Forms]
 *     security:
 *       - BearerAuth: []
 *     description: Retrieve all form submissions for a specific form
 *     parameters:
 *       - in: path
 *         name: formId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The form ID
 *     responses:
 *       200:
 *         description: List of form submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   submission_id:
 *                     type: integer
 *                   form_id:
 *                     type: integer
 *                   submitted_data:
 *                     type: object
 *                   submitted_at:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - submission_id: 1
 *                 form_id: 1
 *                 submitted_data: { "email": "user@example.com", "message": "Hello!" }
 *                 submitted_at: "2024-10-07T12:30:00Z"
 */
router.get('/forms/:formId/submissions', authMiddleware, roleMiddleware(['admin', 'editor']), formController.getFormSubmissions);

/**
 * @swagger
 * /forms/submissions/{submissionId}:
 *   get:
 *     summary: Get details of a specific submission
 *     tags: [Forms]
 *     security:
 *       - BearerAuth: []
 *     description: Get details of a specific form submission
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The submission ID
 *     responses:
 *       200:
 *         description: Submission details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 submission_id:
 *                   type: integer
 *                 form_id:
 *                   type: integer
 *                 submitted_data:
 *                   type: object
 *                 submitted_at:
 *                   type: string
 *                   format: date-time
 *             example:
 *               submission_id: 1
 *               form_id: 1
 *               submitted_data: { "email": "user@example.com", "message": "Hello!" }
 *               submitted_at: "2024-10-07T12:30:00Z"
 */
router.get('/forms/submissions/:submissionId', authMiddleware, roleMiddleware(['admin']), formController.getSubmissionDetails);

module.exports = router;
