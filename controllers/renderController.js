import renderService from '../services/renderService.js';

// Controller to handle the request and send the response
export const renderPage = async (req, res) => {
  const { pageId } = req.params;

  try {
    const pageData = await renderService(pageId);
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

export default renderPage;