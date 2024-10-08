// cms-api/controllers/sectionController.js

const sectionService = require('../services/sectionService');

// Get all sections for a specific page
const getSections = async (req, res) => {
    try {
        const { pageId } = req.params;
        const sections = await sectionService.getSectionsByPageId(pageId);
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new section
const createSection = async (req, res) => {
    try {
        const { pageId } = req.params;
        const sectionData = { ...req.body, page_id: pageId }; // Include pageId
        const newSectionId = await sectionService.createSection(sectionData);
        res.status(201).json({ section_id: newSectionId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a section by ID
const updateSection = async (req, res) => {
    try {
        const { id } = req.params;
        await sectionService.updateSection(id, req.body);
        res.status(200).json({ message: 'Section updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a section by ID
const deleteSection = async (req, res) => {
    try {
        const { id } = req.params;
        await sectionService.deleteSection(id);
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Export the functions
module.exports = {
    getSections,
    createSection,
    updateSection,
    deleteSection
};
