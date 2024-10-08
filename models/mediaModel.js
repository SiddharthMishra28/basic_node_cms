const db = require('../config/db'); // Adjust path as necessary

const mediaModel = {
    create: async (data) => {
        const { file_name, file_path, media_type, description, section_id, page_id } = data;
        const [result] = await db.execute(
            'INSERT INTO media (file_name, file_path, media_type, description, section_id, page_id) VALUES (?, ?, ?, ?, ?, ?)',
            [file_name, file_path, media_type, description, section_id, page_id]
        );
        return { media_id: result.insertId, ...data };
    },

    findById: async (id) => {
        const [rows] = await db.execute('SELECT * FROM media WHERE media_id = ?', [id]);
        return rows[0];
    },

    findAll: async () => {
        const [rows] = await db.execute('SELECT * FROM media');
        return rows;
    },

    deleteById: async (id) => {
        await db.execute('DELETE FROM media WHERE media_id = ?', [id]);
    },
};

module.exports = mediaModel;
