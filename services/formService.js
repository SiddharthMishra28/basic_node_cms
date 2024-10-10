import formModel from '../models/formModel.js';

export const getAllForms = async () => {
    return await formModel.getAllForms();
};

export const createForm = async (formName, description) => {
    return await formModel.createForm(formName, description);
};

export const updateForm = async (id, formName, description) => {
    return await formModel.updateForm(id, formName, description);
};

export const deleteForm = async (id) => {
    return await formModel.deleteForm(id);
};

export const getFormFields = async (formId) => {
    return await formModel.getFormFields(formId);
};

export const addFormField = async (formId, fieldName, fieldType, isRequired, position) => {
    return await formModel.addFormField(formId, fieldName, fieldType, isRequired, position);
};

export const deleteFormField = async (formId, fieldId) => {
    return await formModel.deleteFormField(formId, fieldId);
};

export const submitForm = async (formId) => {
    return await formModel.submitForm(formId);
};

export const getFormSubmissions = async (formId) => {
    return await formModel.getFormSubmissions(formId);
};

export const getSubmissionDetails = async (submissionId) => {
    return await formModel.getSubmissionDetails(submissionId);
};

export default {
    getAllForms,
    createForm,
    updateForm,
    deleteForm,
    getFormFields,
    addFormField,
    deleteFormField,
    submitForm,
    getFormSubmissions,
    getSubmissionDetails
}
