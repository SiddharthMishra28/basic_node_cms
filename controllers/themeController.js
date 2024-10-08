// controllers/themeController.js
const Theme = require('../models/themeModel');

// Get a list of themes
exports.getThemes = async (req, res) => {
    try {
        const themes = await Theme.getAll();
        res.status(200).json(themes);
    } catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ error: 'Failed to retrieve themes' });
    }
};

// Create a new theme
exports.createTheme = async (req, res) => {
    const { theme_name, primary_color, secondary_color, font_family, font_size } = req.body;

    if (!theme_name) {
        return res.status(400).json({ error: 'Theme name is required' });
    }

    try {
        const theme = await Theme.create({
            theme_name,
            primary_color,
            secondary_color,
            font_family,
            font_size,
        });
        res.status(201).json(theme);
    } catch (error) {
        console.error('Error creating theme:', error);
        res.status(400).json({ error: 'Failed to create theme' });
    }
};

// Update an existing theme
exports.updateTheme = async (req, res) => {
    const { id } = req.params;
    const { theme_name, primary_color, secondary_color, font_family, font_size } = req.body;

    if (!theme_name) {
        return res.status(400).json({ error: 'Theme name is required' });
    }

    try {
        const updatedTheme = await Theme.update(id, {
            theme_name,
            primary_color,
            secondary_color,
            font_family,
            font_size,
        });

        if (!updatedTheme) {
            return res.status(404).json({ error: 'Theme not found' });
        }

        res.status(200).json(updatedTheme);
    } catch (error) {
        console.error('Error updating theme:', error);
        res.status(400).json({ error: 'Failed to update theme' });
    }
};

// Delete a theme
exports.deleteTheme = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Theme.delete(id);
        if (!result) {
            return res.status(404).json({ error: 'Theme not found' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting theme:', error);
        res.status(500).json({ error: 'Failed to delete theme' });
    }
};

// Change the status of a theme (active/inactive)
exports.changeThemeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || (status !== 'active' && status !== 'inactive')) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    try {
        const updatedTheme = await Theme.changeStatus(id, status);

        if (!updatedTheme) {
            return res.status(404).json({ error: 'Theme not found' });
        }

        res.status(200).json(updatedTheme);
    } catch (error) {
        console.error('Error updating theme status:', error);
        res.status(400).json({ error: 'Failed to update theme status' });
    }
};
