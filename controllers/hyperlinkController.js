const hyperlinkService = require('../services/hyperlinkService');

// Get all hyperlinks for a section
const getAllHyperlinks = async (req, res) => {
    const { sectionId } = req.params;
    try {
        const hyperlinks = await hyperlinkService.getAllHyperlinks(sectionId);
        res.status(200).json(hyperlinks);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve hyperlinks.' });
    }
};

// Create a new hyperlink
const createHyperlink = async (req, res) => {
    const { pageId, sectionId } = req.params;
    const { label, url, target } = req.body;
    try {
        const newLinkId = await hyperlinkService.createHyperlink(label, url, target, pageId, sectionId);
        res.status(201).json({ message: 'Hyperlink created', linkId: newLinkId });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create hyperlink.' });
    }
};

// Delete a hyperlink
const deleteHyperlink = async (req, res) => {
    const { linkId } = req.params;
    try {
        await hyperlinkService.deleteHyperlink(linkId);
        res.status(200).json({ message: 'Hyperlink deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete hyperlink.' });
    }
};

module.exports = {
    getAllHyperlinks,
    createHyperlink,
    deleteHyperlink
};
