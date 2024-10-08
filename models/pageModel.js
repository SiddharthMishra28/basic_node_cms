const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM pages');
    return rows;
};

exports.getBySlug = async (slug) => {
    const [rows] = await db.query('SELECT * FROM pages WHERE slug = ?', [slug]);
    return rows[0];
};

exports.create = async ({ title, slug, content, meta_description, meta_keywords, is_published }) => {
    const [result] = await db.query(
        'INSERT INTO pages (title, slug, content, meta_description, meta_keywords, is_published) VALUES (?, ?, ?, ?, ?, ?)',
        [title, slug, content, meta_description, meta_keywords, is_published]
    );
    return { id: result.insertId, title, slug, content, meta_description, meta_keywords, is_published };
};

exports.update = async (id, { title, slug, content, meta_description, meta_keywords, is_published }) => {
    const [result] = await db.query(
        'UPDATE pages SET title = ?, slug = ?, content = ?, meta_description = ?, meta_keywords = ?, is_published = ? WHERE page_id = ?',
        [title, slug, content, meta_description, meta_keywords, is_published, id]
    );
    return result.affectedRows > 0 ? { id, title, slug, content, meta_description, meta_keywords, is_published } : null;
};

exports.delete = async (id) => {
    const [result] = await db.query('DELETE FROM pages WHERE page_id = ?', [id]);
    return result.affectedRows > 0;
};
