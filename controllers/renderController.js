const renderService = require('../services/renderService');

// Controller to handle the request and send the response
exports.renderPage = async (req, res) => {
  const { pageId } = req.params;

  try {
    const pageData = await renderService.getPageDataForRendering(pageId);
    res.status(200).json({
      success: true,
      data: pageData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
