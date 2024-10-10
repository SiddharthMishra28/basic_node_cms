import PageService from '../services/pageService.js';

const pageController =  {
    getPages : async (req, res, next) => {
        try {
            const pages = await PageService.getAllPages();
            res.status(200).json(pages);
        } catch (error) {
            next(error);
        }
    },

    getPageBySlug : async (req, res, next) => {
        try {
            const { slug } = req.params;
            const page = await PageService.getPageBySlug(slug);
            if (!page) {
                return res.status(404).json({ message: 'Page not found' });
            }
            res.status(200).json(page);
        } catch (error) {
            next(error);
        }
    },

    createPage : async (req, res, next) => {
        try {
            const { title, slug, content, meta_description, meta_keywords, is_published } = req.body;
            const newPage = await PageService.createPage({ title, slug, content, meta_description, meta_keywords, is_published });
            res.status(201).json(newPage);
        } catch (error) {
            next(error);
        }
    },

    updatePage : async (req, res, next) => {
        try {
            const { id } = req.params;
            const { title, slug, content, meta_description, meta_keywords, is_published } = req.body;
            const updatedPage = await PageService.updatePage(id, { title, slug, content, meta_description, meta_keywords, is_published });
            if (!updatedPage) {
                return res.status(404).json({ message: 'Page not found' });
            }
            res.status(200).json(updatedPage);
        } catch (error) {
            next(error);
        }
    },

    deletePage : async (req, res, next) => {
        try {
            const { id } = req.params;
            const deleted = await PageService.deletePageById(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Page not found' });
            }
            res.status(200).json({ message: 'Page deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default pageController;