import mediaModel from '../models/mediaModel.js';
import sectionModel from '../models/sectionModel.js';

const mediaService = {
    uploadMedia: async (mediaData) => {
        const { section_id } = mediaData;

        // Validate section_id if provided
        if (section_id) {
            const section = await sectionModel.findById(section_id);
            if (!section) {
                throw new Error('Invalid section_id');
            }
        }

        // Create media entry in the database
        return await mediaModel.create(mediaData);
    },

    getAllMedia: async () => {
        return await mediaModel.findAll();
    },

    getMediaById: async (id) => {
        const media = await mediaModel.findById(id);
        if (!media) {
            throw new Error('Media not found');
        }
        return media;
    },

    deleteMedia: async (id) => {
        const media = await mediaModel.findById(id);
        if (!media) {
            throw new Error('Media not found');
        }
        await mediaModel.deleteById(id);
    },
};

export default mediaService;
