const createResponse = require("../models/responseModel");
const APIKeyService = require("../services/apiKeyService");

const apiKeyMiddleware = async (req, res, next) => {
  const userId = req.header("user-id");
  if (!userId) {
    return res
      .status(401)
      .json(createResponse(false, null, "Unauthorized: No user Id provided"));
  }

  const apiKeyService = new APIKeyService();

  try {
    const result = await apiKeyService.validateKeyForUser(userId);
    if (!result?.success) {
      return res
        .status(403)
        .json(createResponse(false, null, "Forbidden: Invalid API key"));
    }

    await apiKeyService.updateAPIKeyUsageCount(result?.data?.id);
    next();
  } catch (error) {
    console.error("API key validation error:", error);
    res
      .status(500)
      .json(
        createResponse(
          false,
          null,
          "Internal Server Error: API key validation failed"
        )
      );
  }
};

module.exports = apiKeyMiddleware;
