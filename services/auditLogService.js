import AuditLog from '../models/auditLogModel.js';

export const getAllAuditLogs = async () => {
    const [logs] = await AuditLog.getAll();
    return logs;
};

export const getAuditLogById = async (logId) => {
    const [log] = await AuditLog.getById(logId);
    if (log.length === 0) {
        throw new Error(`Audit log with ID ${logId} not found`);
    }
    return log[0];
};

export default {
    getAllAuditLogs,
    getAuditLogById
}