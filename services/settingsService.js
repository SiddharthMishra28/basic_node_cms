// services/settingsService.js
const Setting = require('../models/settingModel');

const getAllSettings = async () => {
    const [rows] = await Setting.getAll();
    return rows;
};

const getSettingByKey = async (key) => {
    const [rows] = await Setting.getByKey(key);
    if (rows.length === 0) {
        throw new Error('Setting not found');
    }
    return rows[0];
};

const updateSettingByKey = async (key, value) => {
    await getSettingByKey(key); // Ensure the setting exists
    await Setting.updateByKey(key, value);
    return { message: `Setting ${key} updated successfully` };
};

const createSetting = async (key, value, type) => {
    const [existingSetting] = await Setting.getByKey(key);
    if (existingSetting.length > 0) {
        throw new Error('Setting with this key already exists');
    }
    await Setting.create(key, value, type);
    return { message: `Setting ${key} created successfully` };
};

module.exports = {
    getAllSettings,
    getSettingByKey,
    updateSettingByKey,
    createSetting
};
