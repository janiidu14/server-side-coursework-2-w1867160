const express = require("express");
const router = express.Router();

const { NODE_ENV } = require("../configs/dotenv");
const AuthService = require("../services/authService");
const { authenticateJWT } = require("../middleware/auth");
const createResponse = require("../models/responseModel");

router.post("/register", async (req, res) => {
  try {
    const authService = new AuthService();
    const result = await authService.registerUser(req.body);
    res.json(result);
  } catch (error) {
    console.error(`Error when registering user: ${error.message}`);
    res
      .status(500)
      .json(createResponse(false, null, "User registration failed"));
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json(createResponse(false, null, "Email and password are required"));
    }
    const authService = new AuthService();
    const result = await authService.login(email, password);

    if (!result.success) {
      return res.json(result);
    }

    const loginData = result?.data;

    res.cookie("jwt", loginData?.accessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.cookie("csrf-token", loginData?.csrfToken, {
      httpOnly: false,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json(createResponse(true, result?.user, "Login Successful"));
  } catch (error) {
    console.error(`Error when loggin in user: ${error.message}`);
    res.status(500).json(createResponse(false, null, "User login failed"));
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("csrf-token", {
      httpOnly: false,
      secure: NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json(createResponse(true, null, "Logout successful"));
  } catch (error) {
    console.error(`Error when loggin out user: ${error.message}`);
    res.status(500).json(createResponse(false, null, "User logout failed"));
  }
});

router.get("/authenticate", authenticateJWT, (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json(createResponse(false, null, "User not authenticated"));
  }

  res.json(createResponse(true, req.user, "User authenticated successfully"));
});

module.exports = router;
