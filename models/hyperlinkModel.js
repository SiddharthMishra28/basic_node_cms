const db = require('../config/db');

const Hyperlink = {
    getAllHyperlinks: async (sectionId) => {
        const [rows] = await db.query(
            `SELECT * FROM hyperlinks WHERE section_id = ?`, 
            [sectionId]
        );
        return rows;
    },

    createHyperlink: async (label, url, target, pageId, sectionId) => {
        const [result] = await db.query(
            `INSERT INTO hyperlinks (label, url, target, page_id, section_id) VALUES (?, ?, ?, ?, ?)`, 
            [label, url, target, pageId, sectionId]
        );
        return result.insertId;
    },

    deleteHyperlink: async (linkId) => {
        await db.query(`DELETE FROM hyperlinks WHERE link_id = ?`, [linkId]);
    }
};

module.exports = Hyperlink;
