const bcrypt = require("bcryptjs");

const generateHash = async (string, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedpassword = await bcrypt.hash(string, salt);
  return hashedpassword;
};

const compareHash = async (rawString, hashedString) => {
  try {
    const isMatch = await bcrypt.compare(rawString, hashedString);
    return isMatch;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = { generateHash, compareHash };
