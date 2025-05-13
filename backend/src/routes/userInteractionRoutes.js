const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/auth");
const csrfProtection = require("../middleware/csrf");
const createResponse = require("../models/responseModel");
const UserInteractionService = require("../services/userInteractionService");

router.use(authenticateJWT);
router.use(csrfProtection);

router.get("/", async (req, res) => {
    try {
      const userInteractionService = new UserInteractionService();
      const userInteractions = await userInteractionService.getAllInteractions();
  
      res.json(userInteractions);
    } catch (error) {
      console.error("Error fetching user interactions:", error);
      res.status(500).json(createResponse(false, null, "Error fetching user interactions"));
    }
  });

router.get("/following/:userId", async (req, res) => {
  try {
    const userId = req.params.userId

    const userInteractionService = new UserInteractionService();
    const userInteractions = await userInteractionService.getFollowingByUserId(userId);
    res.json(userInteractions);
  } catch (error) {
    console.error("Error fetching user interactions:", error);
    res.status(500).json(createResponse(false, null, "Error fetching user interactions"));
  }
});

router.get("/followers/:userId", async (req, res) => {
  try {
    const userId = req.params.userId

    const userInteractionService = new UserInteractionService();
    const userInteractions = await userInteractionService.getFollowersByUserId(userId);
    res.json(userInteractions);
  } catch (error) {
    console.error("Error fetching user interactions:", error);
    res.status(500).json(createResponse(false, null, "Error fetching user interactions"));
  }
});

router.post("/", async (req, res) => {
  try {
    const { blogId, type } = req.body;
    const userId = req.user.id;
    if (!blogId || !type) {
      return res
        .status(400)
        .json(
          createResponse(false, null, "All fields are required")
        );
    }
    const userInteractionService = new UserInteractionService();
    const userInteraction = await userInteractionService.createInteraction(userId, req.body);
    res.json(userInteraction);
  } catch (error) {
    console.error("Error creating user interaction:", error);
    res.status(500).json(createResponse(false, null, "Error creating user interaction"));
  }
});


module.exports = router;
