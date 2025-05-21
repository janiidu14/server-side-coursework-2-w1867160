const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/auth");
const csrfProtection = require("../middleware/csrf");
const createResponse = require("../models/responseModel");
const BlogService = require("../services/blogService");

router.get("/", async (req, res) => {
  try {
    const blogService = new BlogService();
    const keys = await blogService.getAllBlogs();

    res.json(keys);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json(createResponse(false, null, "Error fetching blogs"));
  }
});

router.get("/sort", async (req, res) => {
  try {
    const { sortBy } = req.query;

    if (!sortBy) {
      return res
        .status(400)
        .json(createResponse(false, null, "SortBy field is required"));
    }

    const blogService = new BlogService();
    const blogs = await blogService.getBlogsBySorting(sortBy);

    res.json(blogs);
  } catch (error) {
    console.error("Error fetching sorted blogs:", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error fetching sorted blogs"));
  }
});

router.use(authenticateJWT);
router.use(csrfProtection);

router.post("/", async (req, res) => {
  try {
    const { title, content, country, visitDate } = req.body;
    const userId = req.user.id;

    if (!title || !content || !country || !visitDate) {
      return res
        .status(400)
        .json(createResponse(false, null, "All fields are required"));
    }

    const blogService = new BlogService();
    const blog = await blogService.createBlog(userId, req.body);

    res.json(blog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json(createResponse(false, null, "Error creating blog"));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogService = new BlogService();
    const blog = await blogService.getBlogById(blogId);

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog by id", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error fetching blog by id"));
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;

    const blogService = new BlogService();
    const blog = await blogService.updateBlogById(blogId, req.body);

    res.json(blog);
  } catch (error) {
    console.error("Error updating blog by id", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error updating blog by id"));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blogService = new BlogService();
    const blog = await blogService.deleteBlogById(blogId);

    res.json(blog);
  } catch (error) {
    console.error("Error deleting blog by id:", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error deleting blog by id"));
  }
});

module.exports = router;
