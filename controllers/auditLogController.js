const auditLogService = require('../services/auditLogService');

// GET all audit logs
const getAllAuditLogs = async (req, res, next) => {
    try {
        const logs = await auditLogService.getAllAuditLogs();
        res.status(200).json(logs);
    } catch (error) {
        next(error);
    }
};

// GET a specific audit log by ID
const getAuditLogById = async (req, res, next) => {
    try {
        const logId = req.params.id;
        const log = await auditLogService.getAuditLogById(logId);
        res.status(200).json(log);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAuditLogs,
    getAuditLogById
};
