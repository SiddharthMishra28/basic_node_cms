// models/settingModel.js
const db = require('../config/db');

const Setting = {
    getAll: async () => {
        return await db.query('SELECT * FROM settings');
    },
    getByKey: async (key) => {
        return await db.query('SELECT * FROM settings WHERE setting_key = ?', [key]);
    },
    updateByKey: async (key, value) => {
        return await db.query('UPDATE settings SET setting_value = ? WHERE setting_key = ?', [value, key]);
    },
    create: async (key, value, type) => {
        return await db.query(
            'INSERT INTO settings (setting_key, setting_value, setting_type) VALUES (?, ?, ?)',
            [key, value, type]
        );
    }
};

module.exports = Setting;
