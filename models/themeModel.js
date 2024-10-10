import db from '../config/db.js';

const ThemeModel = {
    // Get all themes
    getAll: async () => {
        try {
            const [results] = await db.query('SELECT * FROM themes');
            return results;
        } catch (error) {
            console.error('Error fetching themes:', error);
            throw error;
        }
    },

    // Get a single theme by ID
    getById: async (id) => {
        try {
            const [results] = await db.query('SELECT * FROM themes WHERE theme_id = ?', [id]);
            return results.length ? results[0] : null; // Return the first result or null if no match
        } catch (error) {
            console.error('Error fetching theme by ID:', error);
            throw error;
        }
    },

    // Create a new theme
    create: async (themeData) => {
        const { theme_name, primary_color, secondary_color, font_family, font_size } = themeData;
        try {
            const [results] = await db.query(
                'INSERT INTO themes (theme_name, primary_color, secondary_color, font_family, font_size) VALUES (?, ?, ?, ?, ?)',
                [theme_name, primary_color, secondary_color, font_family, font_size]
            );
            return { id: results.insertId, ...themeData }; // Return the newly created theme data
        } catch (error) {
            console.error('Error creating theme:', error);
            throw error;
        }
    },

    // Update an existing theme
    update: async (id, themeData) => {
        const { theme_name, primary_color, secondary_color, font_family, font_size } = themeData;
        try {
            const [results] = await db.query(
                'UPDATE themes SET theme_name = ?, primary_color = ?, secondary_color = ?, font_family = ?, font_size = ? WHERE theme_id = ?',
                [theme_name, primary_color, secondary_color, font_family, font_size, id]
            );
            if (results.affectedRows === 0) {
                return null; // Return null if no rows were affected (theme not found)
            }
            return { id, ...themeData }; // Return the updated theme data
        } catch (error) {
            console.error('Error updating theme:', error);
            throw error;
        }
    },

    // Delete a theme by ID
    delete: async (id) => {
        try {
            const [results] = await db.query('DELETE FROM themes WHERE theme_id = ?', [id]);
            return results.affectedRows > 0; // Return true if a row was deleted, otherwise false
        } catch (error) {
            console.error('Error deleting theme:', error);
            throw error;
        }
    },

    // Change the status of a theme (active/inactive)
    changeStatus: async (id, status) => {
        try {
            const [results] = await db.query('UPDATE themes SET status = ? WHERE theme_id = ?', [status, id]);
            if (results.affectedRows === 0) {
                return null; // Return null if no rows were affected (theme not found)
            }
            return { id, status }; // Return the updated status
        } catch (error) {
            console.error('Error changing theme status:', error);
            throw error;
        }
    }
};

export default ThemeModel;
