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
      console.log("userInteractions");

      const userInteractionService = new UserInteractionService();
      const userInteractions = await userInteractionService.getAllInteractions();
      console.log(userInteractions);
  
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
    const { followerId, followingId } = req.body;
    if (!followingId || !followerId) {
      return res
        .status(400)
        .json(
          createResponse(false, null, "All fields are required")
        );
    }
    const userInteractionService = new UserInteractionService();
    const userInteraction = await userInteractionService.createInteraction(followerId, followingId);
    res.json(userInteraction);
  } catch (error) {
    console.error("Error creating user interaction:", error);
    res.status(500).json(createResponse(false, null, "Error creating user interaction"));
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId

    const { followingId } = req.body;
    if (!followingId) {
      return res
        .status(400)
        .json(
          createResponse(false, null, "All fields are required")
        );
    }
    const userInteractionService = new UserInteractionService();
    const userInteraction = await userInteractionService.deleteInteractionById(userId, followingId);
    res.json(userInteraction);
  } catch (error) {
    console.error("Error deleting user interaction:", error);
    res.status(500).json(createResponse(false, null, "Error deleting user interaction"));
  }
});


module.exports = router;
