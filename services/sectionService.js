import sectionModel from '../models/sectionModel.js';

// Get all sections for a specific page
export const getSectionsByPageId = async (pageId) => {
    return await sectionModel.getSectionsByPageId(pageId);
};

// Create a new section
export const createSection = async (sectionData) => {
    return await sectionModel.createSection(sectionData);
};

// Update a section by ID
export const updateSection = async (id, sectionData) => {
    return await sectionModel.updateSection(id, sectionData);
};

// Delete a section by ID
export const deleteSection = async (id) => {
    return await sectionModel.deleteSection(id);
};

export default {
    getSectionsByPageId,
    createSection,
    updateSection,
    deleteSection
}