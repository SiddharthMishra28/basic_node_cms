// cms-api/services/sectionService.js

const sectionModel = require('../models/sectionModel');

// Get all sections for a specific page
const getSectionsByPageId = async (pageId) => {
    return await sectionModel.getSectionsByPageId(pageId);
};

// Create a new section
const createSection = async (sectionData) => {
    return await sectionModel.createSection(sectionData);
};

// Update a section by ID
const updateSection = async (id, sectionData) => {
    return await sectionModel.updateSection(id, sectionData);
};

// Delete a section by ID
const deleteSection = async (id) => {
    return await sectionModel.deleteSection(id);
};

// Export the functions
module.exports = {
    getSectionsByPageId,
    createSection,
    updateSection,
    deleteSection
};
