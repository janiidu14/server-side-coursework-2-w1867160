const { v4: uuidv4 } = require("uuid");

const createResponse = require("../models/responseModel");
const ReactionDAO = require("../repositories/reactionDAO");

class ReactionService {
  constructor() {
    this.reactionDAO = new ReactionDAO();
  }

  async reactToBlog (userId, data) {
    try {
      const id = uuidv4();
      const blog = await this.reactionDAO.createInteraction(
        id,
        userId,
        data
      );

    //   switch (result) {
    //     case 'added':
    //       return { message: 'Reaction added' };
    //     case 'updated':
    //       return { message: 'Reaction updated' };
    //     case 'removed':
    //       return { message: 'Reaction removed' };
    //   }
      return createResponse(
        true,
        blog,
        "User interaction created successfully"
      );
    } catch (error) {
      throw new Error(`Error creating user interaction : ${error.message}`);
    }
  }

  async getCountByBlogId(blogId) {
    try {
      const count = await this.reactionDAO.getCountByBlogId(blogId);
      return createResponse(
        true,
        count,
        "User interaction created successfully"
      );
    } catch (error) {
      throw new Error(`Error creating user interaction : ${error.message}`);
    }
  }

  async getUserReactionByBlogId(blogId) {
    try {
      const count = await this.reactionDAO.getUserReactionByBlogId(blogId);
      return createResponse(
        true,
        count,
        "User interaction created successfully"
      );
    } catch (error) {
      throw new Error(`Error creating user interaction : ${error.message}`);
    }
  }
}

module.exports = ReactionService;
