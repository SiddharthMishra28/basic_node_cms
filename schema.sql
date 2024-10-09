CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE themes (
    theme_id INT AUTO_INCREMENT PRIMARY KEY,
    theme_name VARCHAR(255) NOT NULL,
    primary_color VARCHAR(7),
    secondary_color VARCHAR(7),
    font_family VARCHAR(255),
    font_size VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'inactive'
);

CREATE TABLE pages (
    page_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    content TEXT,
    meta_description VARCHAR(255),
    meta_keywords VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_published BOOLEAN DEFAULT FALSE
);

CREATE TABLE sections (
    section_id INT AUTO_INCREMENT PRIMARY KEY,
    section_type ENUM('header', 'footer', 'content', 'sidebar', 'banner', 'carousel', 'contact_form') NOT NULL,
    content TEXT,
    page_id INT,
    theme_id INT,
    position INT,
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE,
    FOREIGN KEY (theme_id) REFERENCES themes(theme_id) ON DELETE SET NULL
);

CREATE TABLE media (
    media_id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    media_type ENUM('image', 'video', 'document') NOT NULL,
    description VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    section_id INT DEFAULT NULL,
    page_id INT DEFAULT NULL,
    FOREIGN KEY (section_id) REFERENCES sections(section_id) ON DELETE CASCADE,
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE
);

CREATE TABLE menus (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_name VARCHAR(255) NOT NULL,
    menu_position ENUM('header', 'footer', 'sidebar') NOT NULL,
    theme_id INT,
    FOREIGN KEY (theme_id) REFERENCES themes(theme_id) ON DELETE SET NULL
);

CREATE TABLE menu_items (
    menu_item_id INT AUTO_INCREMENT PRIMARY KEY,
    menu_id INT,
    label VARCHAR(255),
    url VARCHAR(255),
    parent_id INT DEFAULT NULL,
    position INT,
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES menu_items(menu_item_id) ON DELETE SET NULL
);

CREATE TABLE settings (
    setting_id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(255) UNIQUE,
    setting_value TEXT,
    setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text'
);

CREATE TABLE hyperlinks (
    link_id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255),
    url VARCHAR(255),
    target ENUM('_self', '_blank') DEFAULT '_self',
    page_id INT,
    section_id INT,
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE,
    FOREIGN KEY (section_id) REFERENCES sections(section_id) ON DELETE CASCADE
);

CREATE TABLE custom_styles (
    style_id INT AUTO_INCREMENT PRIMARY KEY,
    css_code TEXT,
    theme_id INT,
    page_id INT DEFAULT NULL,
    FOREIGN KEY (theme_id) REFERENCES themes(theme_id) ON DELETE CASCADE,
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE SET NULL
);

CREATE TABLE forms (
    form_id INT AUTO_INCREMENT PRIMARY KEY,
    form_name VARCHAR(255) NOT NULL,
    description TEXT,
    page_id INT,  -- Add this line to relate forms to pages
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE -- Ensure it relates to pages
);

CREATE TABLE form_fields (
    field_id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT,
    field_name VARCHAR(255) NOT NULL,
    field_type ENUM('text', 'email', 'textarea', 'number', 'date') DEFAULT 'text',
    is_required BOOLEAN DEFAULT FALSE,
    position INT,
    FOREIGN KEY (form_id) REFERENCES forms(form_id) ON DELETE CASCADE
);

CREATE TABLE form_submissions (
    submission_id INT AUTO_INCREMENT PRIMARY KEY,
    form_id INT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES forms(form_id) ON DELETE CASCADE
);

CREATE TABLE form_submission_data (
    submission_data_id INT AUTO_INCREMENT PRIMARY KEY,
    submission_id INT,
    field_id INT,
    field_value TEXT,
    FOREIGN KEY (submission_id) REFERENCES form_submissions(submission_id) ON DELETE CASCADE,
    FOREIGN KEY (field_id) REFERENCES form_fields(field_id) ON DELETE CASCADE
);

CREATE TABLE audit_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(255),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

ALTER TABLE pages
ADD COLUMN theme_id INT;

ALTER TABLE media
ADD COLUMN theme_id INT;