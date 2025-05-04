const jwt = require("jsonwebtoken");
const { generateCSRFToken } = require("./csrf");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("./dotenv");

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const csrfToken = generateCSRFToken();

  return {
    accessToken,
    csrfToken,
  };
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateTokens,
  verifyToken,
};


