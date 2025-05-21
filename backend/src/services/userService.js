const createResponse = require("../models/responseModel");
const UserDAO = require("../repositories/userDAO");

class UserService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async fetchAllUsers() {
    try {
      const users = await this.userDAO.fetchAllUsers();
      return createResponse(true, users, "All users fetched successfully");
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async fetchUserById(id) {
    try {
      const user = await this.userDAO.findUserById(id);
      return createResponse(true, user, "User fetched successfully");
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }
}

module.exports = UserService;
