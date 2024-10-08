const formModel = require('../models/formModel');

exports.getAllForms = async () => {
    return await formModel.getAllForms();
};

exports.createForm = async (formName, description) => {
    return await formModel.createForm(formName, description);
};

exports.updateForm = async (id, formName, description) => {
    return await formModel.updateForm(id, formName, description);
};

exports.deleteForm = async (id) => {
    return await formModel.deleteForm(id);
};

exports.getFormFields = async (formId) => {
    return await formModel.getFormFields(formId);
};

exports.addFormField = async (formId, fieldName, fieldType, isRequired, position) => {
    return await formModel.addFormField(formId, fieldName, fieldType, isRequired, position);
};

exports.deleteFormField = async (formId, fieldId) => {
    return await formModel.deleteFormField(formId, fieldId);
};

exports.submitForm = async (formId) => {
    return await formModel.submitForm(formId);
};

exports.getFormSubmissions = async (formId) => {
    return await formModel.getFormSubmissions(formId);
};

exports.getSubmissionDetails = async (submissionId) => {
    return await formModel.getSubmissionDetails(submissionId);
};
