const formService = require('../services/formService');

// Get all forms
exports.getAllForms = async (req, res) => {
    const forms = await formService.getAllForms();
    res.json(forms);
};

// Create new form
exports.createForm = async (req, res) => {
    const { formName, description } = req.body;
    const formId = await formService.createForm(formName, description);
    res.json({ formId });
};

// Update existing form
exports.updateForm = async (req, res) => {
    const { id } = req.params;
    const { formName, description } = req.body;
    const updated = await formService.updateForm(id, formName, description);
    res.json({ updated });
};

// Delete a form
exports.deleteForm = async (req, res) => {
    const { id } = req.params;
    const deleted = await formService.deleteForm(id);
    res.json({ deleted });
};

// Get all fields for a form
exports.getFormFields = async (req, res) => {
    const { formId } = req.params;
    const fields = await formService.getFormFields(formId);
    res.json(fields);
};

// Add new field to a form
exports.addFormField = async (req, res) => {
    const { formId } = req.params;
    const { fieldName, fieldType, isRequired, position } = req.body;
    const fieldId = await formService.addFormField(formId, fieldName, fieldType, isRequired, position);
    res.json({ fieldId });
};

// Delete a field from a form
exports.deleteFormField = async (req, res) => {
    const { formId, fieldId } = req.params;
    const deleted = await formService.deleteFormField(formId, fieldId);
    res.json({ deleted });
};

// Submit a form
exports.submitForm = async (req, res) => {
    const { formId } = req.params;
    const submissionId = await formService.submitForm(formId);
    res.json({ submissionId });
};

// Get all submissions for a form
exports.getFormSubmissions = async (req, res) => {
    const { formId } = req.params;
    const submissions = await formService.getFormSubmissions(formId);
    res.json(submissions);
};

// Get submission details
exports.getSubmissionDetails = async (req, res) => {
    const { submissionId } = req.params;
    const submissionData = await formService.getSubmissionDetails(submissionId);
    res.json(submissionData);
};
