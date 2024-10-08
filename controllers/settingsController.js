// controllers/settingsController.js
const settingsService = require('../services/settingsService');

const getAllSettings = async (req, res) => {
    try {
        const settings = await settingsService.getAllSettings();
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSettingByKey = async (req, res) => {
    const { key } = req.params;
    const { value } = req.body;
    try {
        const result = await settingsService.updateSettingByKey(key, value);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSetting = async (req, res) => {
    const { key, value, type } = req.body;
    try {
        const result = await settingsService.createSetting(key, value, type);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllSettings,
    updateSettingByKey,
    createSetting
};
