const renderModel = require('../models/renderModel');

// Fetch the complete page data using the model
exports.getPageDataForRendering = async (pageId) => {
  try {
    const pageData = await renderModel.getPageData(pageId);
    if (!pageData) {
      throw new Error('Page not found');
    }

    // Handle null values and structure defaults
    pageData.logo = pageData.logo || '';
    pageData.menus = pageData.menus ? JSON.parse(pageData.menus) : [];
    pageData.sections = pageData.sections ? JSON.parse(pageData.sections) : [];
    pageData.forms = pageData.forms ? JSON.parse(pageData.forms) : [];
    pageData.custom_css = pageData.custom_css || '';

    return pageData;
  } catch (error) {
    throw new Error(error.message);
  }
};
