import CustomStyle from '../models/customSylesModel.js'; // Fixed typo in import

// Get all custom styles
export const getAllCustomStyles = async (req, res) => {
    try {
        const [styles] = await CustomStyle.getAll();
        res.status(200).json(styles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching custom styles' });
    }
};

// Add a new custom style (Admin)
export const addCustomStyle = async (req, res) => {
    const { css_code, theme_id, page_id } = req.body;
    if (!css_code || !theme_id) {
        return res.status(400).json({ message: 'css_code and theme_id are required' });
    }
    try {
        await CustomStyle.add(css_code, theme_id, page_id);
        res.status(201).json({ message: 'Custom style added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding custom style' });
    }
};

// Update a custom style (Admin)
export const updateCustomStyle = async (req, res) => {
    const { id } = req.params;
    const { css_code, theme_id, page_id } = req.body;
    if (!css_code || !theme_id) {
        return res.status(400).json({ message: 'css_code and theme_id are required' });
    }
    try {
        await CustomStyle.update(id, css_code, theme_id, page_id);
        res.status(200).json({ message: 'Custom style updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating custom style' });
    }
};

// Delete a custom style (Admin)
export const deleteCustomStyle = async (req, res) => {
    const { id } = req.params;
    try {
        await CustomStyle.delete(id);
        res.status(200).json({ message: 'Custom style deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting custom style' });
    }
};

export default {
    getAllCustomStyles,
    addCustomStyle,
    updateCustomStyle,
    deleteCustomStyle
}