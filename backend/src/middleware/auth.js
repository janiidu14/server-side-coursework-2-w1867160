const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../configs/dotenv");
const createResponse = require("../models/responseModel");

const authenticateJWT = (req, res, next) => {
  if (!req?.cookies?.jwt) {
    return res
      .status(401)
      .json(
        createResponse(false, null, "Unauthorized: No JWT token in cookies")
      );
  }

  const token = req?.cookies?.jwt;

  if (!token) {
    return res
      .status(401)
      .json(createResponse(false, null, "Unauthorized: No JWT token provided"));
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(403)
      .json(createResponse(false, null, "Forbidden: Invalid JWT token"));
  }
};

module.exports = { authenticateJWT };
