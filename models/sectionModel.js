// cms-api/models/sectionModel.js

const db = require('../config/db');

// Function to get all sections for a specific page
const getSectionsByPageId = async (pageId) => {
    const [rows] = await db.query('SELECT * FROM sections WHERE page_id = ?', [pageId]);
    return rows;
};

// Function to create a new section
const createSection = async (sectionData) => {
    const [result] = await db.query('INSERT INTO sections SET ?', sectionData);
    return result.insertId; // Return the newly created section ID
};

// Function to update a section by ID
const updateSection = async (id, sectionData) => {
    await db.query('UPDATE sections SET ? WHERE section_id = ?', [sectionData, id]);
};

// Function to delete a section by ID
const deleteSection = async (id) => {
    await db.query('DELETE FROM sections WHERE section_id = ?', [id]);
};

const findById =  async (id) => {
    const [rows] = await db.execute('SELECT * FROM sections WHERE section_id = ?', [id]);
    return rows[0]; // Return the first row or undefined if not found
}

// Export the functions
module.exports = {
    getSectionsByPageId,
    createSection,
    updateSection,
    deleteSection,
    findById
};
