const db = require('../config/db');
const logger = require('../config/logger');

exports.getUsers = async (req, res) => {
    try {
        const [users] = await db.execute('SELECT user_id, username, email, role, created_at FROM users');
        res.json(users);
    } catch (error) {
        logger.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(users[0]);
    } catch (error) {
        logger.error('Error retrieving user:', error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    try {
        const [result] = await db.execute(
            'UPDATE users SET username = ?, email = ?, role = ? WHERE user_id = ?',
            [username, email, role, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        logger.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.execute('DELETE FROM users WHERE user_id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        logger.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
};
