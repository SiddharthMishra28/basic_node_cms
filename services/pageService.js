const PageModel = require('../models/pageModel');

exports.getAllPages = async () => {
    return await PageModel.getAll();
};

exports.getPageBySlug = async (slug) => {
    return await PageModel.getBySlug(slug);
};

exports.createPage = async (pageData) => {
    return await PageModel.create(pageData);
};

exports.updatePage = async (id, pageData) => {
    return await PageModel.update(id, pageData);
};

exports.deletePage = async (id) => {
    return await PageModel.delete(id);
};
