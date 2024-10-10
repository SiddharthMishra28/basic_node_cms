import db from '../config/db.js';

const Menu = {
    getAll: async () => {
        return await db.query('SELECT * FROM menus');
    },

    create: async (menu_name, menu_position, theme_id) => {
        return await db.query('INSERT INTO menus (menu_name, menu_position, theme_id) VALUES (?, ?, ?)', [menu_name, menu_position, theme_id]);
    },

    update: async (id, menu_name, menu_position, theme_id) => {
        return await db.query('UPDATE menus SET menu_name = ?, menu_position = ?, theme_id = ? WHERE menu_id = ?', [menu_name, menu_position, theme_id, id]);
    },

    delete: async (id) => {
        return await db.query('DELETE FROM menus WHERE menu_id = ?', [id]);
    },

    getMenuItems: async (menuId) => {
        return await db.query('SELECT * FROM menu_items WHERE menu_id = ?', [menuId]);
    },

    addItem: async (menuId, label, url, parent_id, position) => {
        return await db.query('INSERT INTO menu_items (menu_id, label, url, parent_id, position) VALUES (?, ?, ?, ?, ?)', [menuId, label, url, parent_id, position]);
    },

    updateItem: async (menuId, itemId, label, url, parent_id, position) => {
        return await db.query('UPDATE menu_items SET label = ?, url = ?, parent_id = ?, position = ? WHERE menu_id = ? AND menu_item_id = ?', [label, url, parent_id, position, menuId, itemId]);
    },

    deleteItem: async (menuId, itemId) => {
        return await db.query('DELETE FROM menu_items WHERE menu_id = ? AND menu_item_id = ?', [menuId, itemId]);
    }
};

export default Menu;
