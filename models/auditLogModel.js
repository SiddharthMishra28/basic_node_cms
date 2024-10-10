import db from '../config/db.js';

const AuditLog = {
    getAll: () => {
        return db.query('SELECT * FROM audit_logs ORDER BY created_at DESC');
    },
    getById: (logId) => {
        return db.query('SELECT * FROM audit_logs WHERE log_id = ?', [logId]);
    }
};

export default AuditLog;
