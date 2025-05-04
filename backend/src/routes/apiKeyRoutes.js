const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/auth");
const csrfProtection = require("../middleware/csrf");
const APIKeyService = require("../services/apiKeyService");
const createResponse = require("../models/responseModel");

router.use(authenticateJWT);
router.use(csrfProtection);

router.get("/all", async (req, res) => {
  try {
    const apiKeyService = new APIKeyService();
    const keys = await apiKeyService.getAllKeys();

    res.json(keys);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error fetching API keys"));
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json(createResponse(false, null, "User ID is required"));
    }

    const apiKeyService = new APIKeyService();
    const keys = await apiKeyService.getKeysByUserId(userId);

    res.json(keys);
  } catch (error) {
    console.error("Error fetching API keys by user id:", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error fetching API keys by user id"));
  }
});

router.post("/generate", async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res
        .status(400)
        .json(createResponse(false, null, "User ID is required"));
    }
    const apiKeyService = new APIKeyService();
    const apiKey = await apiKeyService.createAPIKey(userId);

    res.json(apiKey);
  } catch (error) {
    console.error("Error generating API key:", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error generating API key"));
  }
});

router.put("/deactivate", async (req, res) => {
  try {
    const { key } = req.body;
    const apiKeyService = new APIKeyService();
    const result = await apiKeyService.deactivateKey(key);

    res.json(result);
  } catch (error) {
    console.error("Error deactivating API key:", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error deactivating API key"));
  }
});

module.exports = router;
