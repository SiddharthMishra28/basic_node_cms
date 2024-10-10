import pageModel from '../models/pageModel.js';

const PageService = {
    getAllPages: async () => {
        return await pageModel.getAll();
    },
    getPageBySlug: async (slug) => {
        return await pageModel.getBySlug(slug);
    },
    createPage: async (pageData) => {
        return await pageModel.create(pageData);
    },
    updatePage: async (id, pageData) => {
        return await pageModel.update(id, pageData);
    },
    deletePageById: async (id) => {
        return await pageModel.deletePage(id);
    }
};

export default PageService;
