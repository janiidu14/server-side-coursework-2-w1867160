const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/auth");
const csrfProtection = require("../middleware/csrf");
const createResponse = require("../models/responseModel");
const UserService = require("../services/userService");

router.use(authenticateJWT);
router.use(csrfProtection);

router.get("/", async (req, res) => {
  try {
    const userService = new UserService();
    const users = await userService.fetchAllUsers();

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json(createResponse(false, null, "Error fetching users"));
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userService = new UserService();
    const user = await userService.fetchUserById(userId);

    res.json(user);
  } catch (error) {
    console.error("Error fetching user by id:", error);
    res
      .status(500)
      .json(createResponse(false, null, "Error fetching user by id"));
  }
});

module.exports = router;
