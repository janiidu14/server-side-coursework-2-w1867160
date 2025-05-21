const { v4: uuidv4 } = require("uuid");

const createResponse = require("../models/responseModel");
const UserInteractionDAO = require("../repositories/userInteractionDAO");

class UserInteractionService {
  constructor() {
    this.userInteractionDAO = new UserInteractionDAO();
  }

  async createInteraction(userId, followingId) {
    try {
      const id = uuidv4();
      const blog = await this.userInteractionDAO.createInteraction(
        id,
        userId,
        followingId
      );
      return createResponse(
        true,
        blog,
        "User interaction created successfully"
      );
    } catch (error) {
      throw new Error(`Error creating user interaction : ${error.message}`);
    }
  }

  async getAllInteractions() {
    try {
      const interactions = await this.userInteractionDAO.getAllInteractions();
      return createResponse(
        true,
        interactions,
        "All user interactions fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetching user interactions: ${error.message}`);
    }
  }

  async getFollowingByUserId(userId) {
    try {
      const interactions = await this.userInteractionDAO.getFollowingByUserId(
        userId
      );
      return createResponse(
        true,
        interactions,
        "All user interactions fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetching user interactions: ${error.message}`);
    }
  }

  async getFollowersByUserId(userId) {
    try {
      const interactions = await this.userInteractionDAO.getFollowersByUserId(
        userId
      );
      return createResponse(
        true,
        interactions,
        "All user interactions fetched successfully"
      );
    } catch (error) {
      throw new Error(`Error fetching user interactions: ${error.message}`);
    }
  }

  async deleteInteractionById(userId, followingId) {
    try {
      const interaction = await this.userInteractionDAO.deleteInteractionById(
        userId,
        followingId
      );
      return createResponse(
        true,
        interaction,
        "User interaction deleted successfully"
      );
    } catch (error) {
      throw new Error(`Error deleting user interaction: ${error.message}`);
    }
  }
}

module.exports = UserInteractionService;
