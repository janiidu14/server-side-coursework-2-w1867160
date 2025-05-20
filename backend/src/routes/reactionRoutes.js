const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/auth");
const csrfProtection = require("../middleware/csrf");
const createResponse = require("../models/responseModel");
const ReactionService = require("../services/reactionService");



  router.get("/public", async (req, res) => {
  try {
    const reactionService = new ReactionService();
    const result = await reactionService.getUserReactionToAllBlogsPublic();

    res.json(result);
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    res.status(500).json(createResponse(false, null, "Error fetching blog by id"));
  }
});


router.use(authenticateJWT);
router.use(csrfProtection);

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
  
        console.log("userId", req.body.type);
  
        const reactionService = new ReactionService();
        const result = await reactionService.reactToBlog(userId, req.body.blogId, req.body.type);
  
      res.json(result);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json(createResponse(false, null, "Error creating blog"));
    }
  });


  router.get("/blogs", async (req, res) => {
  try {
    const reactionService = new ReactionService();
    const result = await reactionService.getUserReactionToAllBlogs(req.user.id);

    res.json(result);
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    res.status(500).json(createResponse(false, null, "Error fetching blog by id"));
  }
});

router.get("/", async (req, res) => {
  try {
    const reactionService = new ReactionService();
    const result = await reactionService.getAllReactions();

    res.json(result);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json(createResponse(false, null, "Error fetching blogs"));
  }
});




router.get("/count/:blogId", async (req, res) => {
    try {
      const reactionService = new ReactionService();
      const result = await reactionService.getCountsForBlog(req.params.blogId);
  
      res.json(result);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json(createResponse(false, null, "Error fetching blogs"));
    }
  });


  router.get("/blog/:blogId", async (req, res) => {
  try {
    const blogId = req.params.id
    const reactionService = new ReactionService();
    const result = await reactionService.getUserReactionForBlog(req.user.id, req.params.blogId);

    res.json(result);
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    res.status(500).json(createResponse(false, null, "Error fetching blog by id"));
  }
});

router.get("/user/:blogId", async (req, res) => {
  try {
    const blogId = req.params.id
    const reactionService = new ReactionService();
    const result = await reactionService.getUserReactionForBlog(req.user.id, req.params.blogId);

    res.json(result);
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    res.status(500).json(createResponse(false, null, "Error fetching blog by id"));
  }
});


module.exports = router;
