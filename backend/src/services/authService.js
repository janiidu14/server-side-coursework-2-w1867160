const { v4: uuidv4 } = require("uuid");

const UserDAO = require("../repositories/userDAO");
const { generateTokens } = require("../configs/jwt");
const createResponse = require("../models/responseModel");
const { generateHash, compareHash } = require("../utils/bcryptUtility");

class AuthService {
  constructor() {
    this.userDAO = new UserDAO();
  }

  async registerUser(userData) {
    try {
      const existingUser = await this.userDAO.findByUserByEmail(
        userData?.email
      );

      if (existingUser) {
        return createResponse(false, null, "User Already Exists");
      }

      const userId = uuidv4();

      const saltRounds = 10;
      const hashedPassword = await generateHash(userData?.password, saltRounds);

      const user = await this.userDAO.createUser({
        ...userData,
        id: userId,
        password: hashedPassword,
      });

      if (!user) {
        return createResponse(false, null, "User Registration Failed");
      }

      delete user?.password;

      return createResponse(true, user, "User Registered Successfully");
    } catch (error) {
      throw new Error(`Error during register process: ${error.message}`);
    }
  }

  async login(email, password) {
    try {
      const user = await this.userDAO.findByUserByEmail(email);

      if (!user) {
        return createResponse(false, null, "User Not Found");
      }

      const isValidPassword = await compareHash(password, user?.password);

      if (!isValidPassword) {
        return createResponse(false, null, "Invalid Password");
      }

      const { accessToken, csrfToken } = generateTokens(user);

      delete user?.password;

      const userLoginData = {
        accessToken,
        csrfToken,
        user,
      };

      return createResponse(
        true,
        userLoginData,
        "User Registered Successfully"
      );
    } catch (error) {
      throw new Error(`Error during login process: ${error.message}`);
    }
  }
}

module.exports = AuthService;
