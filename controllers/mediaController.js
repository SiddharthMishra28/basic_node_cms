import mediaService from '../services/mediaService.js';
import path from 'path';
import fs from 'fs';

// Upload media
export const uploadMedia = async (req, res) => {
    try {
        const { section_id, page_id, description } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // Extracting the file extension and ensuring a unique file name
        const extension = path.extname(file.originalname);
        const fileName = `${Date.now()}${extension}`; // Use a timestamp to avoid name clashes
        const uploadPath = path.join(process.cwd(), 'public/uploads/', fileName); // Changed to process.cwd() for better path resolution

        // Move the uploaded file to the specified directory
        fs.renameSync(file.path, uploadPath);

        // Save file info to the database
        const mediaData = {
            file_name: fileName,
            file_path: `/uploads/${fileName}`, // Path for URL access
            media_type: file.mimetype.split('/')[0], // 'image', 'video', etc.
            section_id: section_id || null,
            page_id: page_id || null,
            description: description || null
        };

        const media = await mediaService.uploadMedia(mediaData);

        return res.status(201).json({ message: "File uploaded successfully.", media });
    } catch (error) {
        console.error("Error uploading media file", error);
        return res.status(500).json({ message: "Error uploading media file", error: error.message });
    }
};

// Get all media
export const getAllMedia = async (req, res) => {
    try {
        const mediaList = await mediaService.getAllMedia();
        return res.status(200).json(mediaList);
    } catch (error) {
        console.error('Error retrieving media', error);
        return res.status(500).json({ message: 'Error retrieving media', error: error.message });
    }
};

// Get media by ID
export const getMediaById = async (req, res) => {
    const { id } = req.params;
    try {
        const media = await mediaService.getMediaById(id);
        return res.status(200).json(media);
    } catch (error) {
        console.error('Error retrieving media', error);
        return res.status(404).json({ message: 'Media not found', error: error.message });
    }
};

// Delete media
export const deleteMedia = async (req, res) => {
    const { id } = req.params;
    try {
        await mediaService.deleteMedia(id);
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting media', error);
        return res.status(404).json({ message: 'Error deleting media', error: error.message });
    }
};

export default {
    uploadMedia,
    getAllMedia,
    getMediaById,
    deleteMedia
}
