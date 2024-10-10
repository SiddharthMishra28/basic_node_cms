import Hyperlink from '../models/hyperlinkModel.js';

export const getAllHyperlinks = async (sectionId) => {
    return await Hyperlink.getAllHyperlinks(sectionId);
};

export const createHyperlink = async (label, url, target, pageId, sectionId) => {
    return await Hyperlink.createHyperlink(label, url, target, pageId, sectionId);
};

export const deleteHyperlink = async (linkId) => {
    await Hyperlink.deleteHyperlink(linkId);
};

export default {
    getAllHyperlinks,
    createHyperlink,
    deleteHyperlink
}