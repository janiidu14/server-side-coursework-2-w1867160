const Tokens = require("csrf");
const { CSRF_SECRET } = require("./dotenv");
const tokens = new Tokens();

const generateCSRFToken = () => {
  return tokens.create(CSRF_SECRET);
};

const verifyToken = (token) => {
  return tokens.verify(CSRF_SECRET, token);
};

module.exports = {
  generateCSRFToken,
  verifyToken,
};
