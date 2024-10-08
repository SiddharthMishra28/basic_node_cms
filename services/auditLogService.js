const AuditLog = require('../models/auditLogModel');

const getAllAuditLogs = async () => {
    const [logs] = await AuditLog.getAll();
    return logs;
};

const getAuditLogById = async (logId) => {
    const [log] = await AuditLog.getById(logId);
    if (log.length === 0) {
        throw new Error(`Audit log with ID ${logId} not found`);
    }
    return log[0];
};

module.exports = {
    getAllAuditLogs,
    getAuditLogById
};
