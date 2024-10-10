import db from '../config/db.js';

// Fetch page details along with all associated data for rendering
export const getPageData = async (pageId) => {
    const query = `
        SELECT 
            p.page_id, p.title, p.slug, p.content, p.meta_description, p.meta_keywords, 
            JSON_ARRAYAGG(JSON_OBJECT(
                'menu_id', m.menu_id,
                'menu_name', m.menu_name,
                'menu_position', m.menu_position,
                'menu_items', (
                    SELECT JSON_ARRAYAGG(JSON_OBJECT(
                        'menu_item_id', mi.menu_item_id,
                        'label', mi.label,
                        'url', mi.url,
                        'parent_id', mi.parent_id,
                        'position', mi.position
                    ))
                    FROM menu_items mi
                    WHERE mi.menu_id = m.menu_id
                )
            )) as menus,
            JSON_ARRAYAGG(JSON_OBJECT(
                'section_id', s.section_id,
                'section_type', s.section_type,
                'content', s.content,
                'position', s.position,
                'links', (
                    SELECT JSON_ARRAYAGG(JSON_OBJECT(
                        'link_id', l.link_id,
                        'label', l.label,
                        'url', l.url,
                        'target', l.target
                    ))
                    FROM hyperlinks l
                    WHERE l.section_id = s.section_id
                )
            )) as sections,
            JSON_ARRAYAGG(JSON_OBJECT(
                'media_id', media.media_id,
                'file_name', media.file_name,
                'file_path', media.file_path,
                'media_type', media.media_type,
                'description', media.description
            )) as media,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT(
                'form_id', f.form_id,
                'form_name', f.form_name,
                'description', f.description,
                'fields', (
                    SELECT JSON_ARRAYAGG(JSON_OBJECT(
                        'field_id', ff.field_id,
                        'field_name', ff.field_name,
                        'field_type', ff.field_type,
                        'is_required', ff.is_required,
                        'position', ff.position
                    ))
                    FROM form_fields ff
                    WHERE ff.form_id = f.form_id
                )
            ))
            FROM forms f
            WHERE f.page_id = p.page_id) as forms,
            (SELECT css_code FROM custom_styles cs WHERE cs.page_id = p.page_id LIMIT 1) as custom_css
        FROM pages p
        LEFT JOIN sections s ON s.page_id = p.page_id
        LEFT JOIN media ON media.page_id = p.page_id  -- Fetch all media items for the page
        LEFT JOIN menus m ON m.theme_id = p.page_id
        WHERE p.page_id = ?
        GROUP BY p.page_id;
    `;
    const [rows] = await db.query(query, [pageId]);
    return rows[0];
};

export default getPageData;