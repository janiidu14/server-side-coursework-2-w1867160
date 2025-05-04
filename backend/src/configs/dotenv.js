require('dotenv').config(); 

module.exports = {
  PORT: process.env.PORT || 8000,
  REST_COUNTRIES_BASE_URL: process.env.REST_COUNTRIES_BASE_URL || "https://restcountries.com/v3.1",
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "24h",
  CSRF_SECRET: process.env.CSRF_SECRET,
  NODE_ENV: process.env.NODE_ENV || "development",
};

