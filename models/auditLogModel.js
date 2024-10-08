const db = require('../config/db');

const AuditLog = {
    getAll: () => {
        return db.query('SELECT * FROM audit_logs ORDER BY created_at DESC');
    },
    getById: (logId) => {
        return db.query('SELECT * FROM audit_logs WHERE log_id = ?', [logId]);
    }
};

module.exports = AuditLog;
