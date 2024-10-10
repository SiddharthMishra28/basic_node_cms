import db from '../config/db.js';

// Form model
export const getAllForms = async () => {
    const [rows] = await db.execute('SELECT * FROM forms');
    return rows;
};

export const createForm = async (formName, description) => {
    const [result] = await db.execute('INSERT INTO forms (form_name, description) VALUES (?, ?)', [formName, description]);
    return result.insertId;
};

export const updateForm = async (id, formName, description) => {
    const [result] = await db.execute('UPDATE forms SET form_name = ?, description = ? WHERE form_id = ?', [formName, description, id]);
    return result.affectedRows;
};

export const deleteForm = async (id) => {
    const [result] = await db.execute('DELETE FROM forms WHERE form_id = ?', [id]);
    return result.affectedRows;
};

export const getFormFields = async (formId) => {
    const [rows] = await db.execute('SELECT * FROM form_fields WHERE form_id = ?', [formId]);
    return rows;
};

export const addFormField = async (formId, fieldName, fieldType, isRequired, position) => {
    const [result] = await db.execute('INSERT INTO form_fields (form_id, field_name, field_type, is_required, position) VALUES (?, ?, ?, ?, ?)', [formId, fieldName, fieldType, isRequired, position]);
    return result.insertId;
};

export const deleteFormField = async (formId, fieldId) => {
    const [result] = await db.execute('DELETE FROM form_fields WHERE form_id = ? AND field_id = ?', [formId, fieldId]);
    return result.affectedRows;
};

export const submitForm = async (formId) => {
    const [result] = await db.execute('INSERT INTO form_submissions (form_id) VALUES (?)', [formId]);
    return result.insertId;
};

export const getFormSubmissions = async (formId) => {
    const [rows] = await db.execute('SELECT * FROM form_submissions WHERE form_id = ?', [formId]);
    return rows;
};

export const getSubmissionDetails = async (submissionId) => {
    const [rows] = await db.execute('SELECT * FROM form_submission_data WHERE submission_id = ?', [submissionId]);
    return rows;
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