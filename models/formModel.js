const db = require('../config/db');

// Form model
exports.getAllForms = async () => {
    const [rows] = await db.execute('SELECT * FROM forms');
    return rows;
};

exports.createForm = async (formName, description) => {
    const [result] = await db.execute('INSERT INTO forms (form_name, description) VALUES (?, ?)', [formName, description]);
    return result.insertId;
};

exports.updateForm = async (id, formName, description) => {
    const [result] = await db.execute('UPDATE forms SET form_name = ?, description = ? WHERE form_id = ?', [formName, description, id]);
    return result.affectedRows;
};

exports.deleteForm = async (id) => {
    const [result] = await db.execute('DELETE FROM forms WHERE form_id = ?', [id]);
    return result.affectedRows;
};

exports.getFormFields = async (formId) => {
    const [rows] = await db.execute('SELECT * FROM form_fields WHERE form_id = ?', [formId]);
    return rows;
};

exports.addFormField = async (formId, fieldName, fieldType, isRequired, position) => {
    const [result] = await db.execute('INSERT INTO form_fields (form_id, field_name, field_type, is_required, position) VALUES (?, ?, ?, ?, ?)', [formId, fieldName, fieldType, isRequired, position]);
    return result.insertId;
};

exports.deleteFormField = async (formId, fieldId) => {
    const [result] = await db.execute('DELETE FROM form_fields WHERE form_id = ? AND field_id = ?', [formId, fieldId]);
    return result.affectedRows;
};

exports.submitForm = async (formId) => {
    const [result] = await db.execute('INSERT INTO form_submissions (form_id) VALUES (?)', [formId]);
    return result.insertId;
};

exports.getFormSubmissions = async (formId) => {
    const [rows] = await db.execute('SELECT * FROM form_submissions WHERE form_id = ?', [formId]);
    return rows;
};

exports.getSubmissionDetails = async (submissionId) => {
    const [rows] = await db.execute('SELECT * FROM form_submission_data WHERE submission_id = ?', [submissionId]);
    return rows;
};
