const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/auth');
const logger = require('../config/logger');

exports.register = async (req, res) => {
    const { username, password, email, role } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    try {
        const [result] = await db.execute(
            'INSERT INTO users (username, password_hash, email, role) VALUES (?, ?, ?, ?)',
            [username, passwordHash, email, role]
        );
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        logger.error('Error during user registration:', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        logger.error('Error during user login:', error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};
