const { v4: uuidv4 } = require("uuid");

const createResponse = require("../models/responseModel");
const ReactionDAO = require("../repositories/reactionDAO");

class ReactionService {
  constructor() {
    this.reactionDAO = new ReactionDAO();
  }

  async reactToBlog(userId, blogId, type) {
    try {
      const id = uuidv4();
      const blog = await this.reactionDAO.createReaction(
        id,
        userId,
        blogId,
        type
      );

      return createResponse(
        true,
        blog,
        "User reaction created successfully"
      );
    } catch (error) {
      throw new Error(`Error creating user reaction: ${error.message}`);
    }
  }

  async getAllReactions() {
    try {
      const reactions = await this.reactionDAO.getAllReactions();

      return createResponse(
        true,
        reactions,
        "All user reactions fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetching user reactions: ${error.message}`);
    }
  }

  async getUserReactionToAllBlogs(userId) {
    try {
      const count = await this.reactionDAO.getAllReactionSummaries(userId);
      return createResponse(
        true,
        count,
        "User reaction for all blogs fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetched user reaction: ${error.message}`);
    }
  }

  async getUserReactionToAllBlogsPublic() {
    try {
      const count = await this.reactionDAO.getUserReactionToAllBlogsPublic();
      return createResponse(
        true,
        count,
        "User reaction for public blogs fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetched reaction: ${error.message}`);
    }
  }

  async getCountByBlogId(blogId) {
    try {
      const count = await this.reactionDAO.getCountByBlogId(blogId);
      return createResponse(
        true,
        count,
        "User reaction fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetched reaction: ${error.message}`);
    }
  }

  async getUserReactionByBlogId(blogId) {
    try {
      const count = await this.reactionDAO.getUserReactionByBlogId(blogId);
      return createResponse(
        true,
        count,
        "User reaction fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetched reaction: ${error.message}`);
    }
  }
}

module.exports = ReactionService;
