import db from '../config/db.js';

// Custom Style Model
const CustomStyle = {
    getAll: async () => {
        return await db.query('SELECT * FROM custom_styles');
    },
    add: async (css_code, theme_id, page_id) => {
        return await db.query(
            'INSERT INTO custom_styles (css_code, theme_id, page_id) VALUES (?, ?, ?)', 
            [css_code, theme_id, page_id]
        );
    },
    update: async (style_id, css_code, theme_id, page_id) => {
        return await db.query(
            'UPDATE custom_styles SET css_code = ?, theme_id = ?, page_id = ? WHERE style_id = ?', 
            [css_code, theme_id, page_id, style_id]
        );
    },
    delete: async (style_id) => {
        return await db.query(
            'DELETE FROM custom_styles WHERE style_id = ?', 
            [style_id]
        );
    }
};

export default CustomStyle;
