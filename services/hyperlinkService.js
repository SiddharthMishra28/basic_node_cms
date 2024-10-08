const Hyperlink = require('../models/hyperlinkModel');

const getAllHyperlinks = async (sectionId) => {
    return await Hyperlink.getAllHyperlinks(sectionId);
};

const createHyperlink = async (label, url, target, pageId, sectionId) => {
    return await Hyperlink.createHyperlink(label, url, target, pageId, sectionId);
};

const deleteHyperlink = async (linkId) => {
    await Hyperlink.deleteHyperlink(linkId);
};

module.exports = {
    getAllHyperlinks,
    createHyperlink,
    deleteHyperlink
};
