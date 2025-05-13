const { v4: uuidv4 } = require("uuid");

const createResponse = require("../models/responseModel");
const BlogDAO = require("../repositories/blogDAO");

class BlogService {
  constructor() {
    this.blogDAO = new BlogDAO();
  }

  async createBlog(userId, data) {
    try {
      const id = uuidv4();
      console.log(data)
      const blog = await this.blogDAO.createBlog(id, userId, data);
      return createResponse(true, blog, "Blog created successfully");
    } catch (error) {
      throw new Error(`Error creating blog: ${error.message}`);
    }
  }

  async getAllBlogs() {
    try {
      const blogs = await this.blogDAO.getAllBlogs();
      return createResponse(true, blogs, "All blogs fetched successfully");
    } catch (error) {
      throw new Error(`Error fetching blogs: ${error.message}`);
    }
  }

  async getBlogById(id) {
    try {
      const blogs = await this.blogDAO.getBlogById(id);
      return createResponse(true, blogs, "All blogs fetched successfully");
    } catch (error) {
      throw new Error(`Error fetching blogs: ${error.message}`);
    }
  }

  async updateBlogById(id, data) {
    try {
      const blog = await this.blogDAO.updateBlogById(id, data);
      return createResponse(true, blog, "Blog updated successfully");
    } catch (error) {
      throw new Error(`Error updating blog: ${error.message}`);
    }
  }

  async deleteBlogById(id) {
    try {
      const blog = await this.blogDAO.deleteBlogById(id);
      return createResponse(true, blog, "Blog deleted successfully");
    } catch (error) {
      throw new Error(`Error deleting blog: ${error.message}`);
    }
  }


}

module.exports = BlogService;
