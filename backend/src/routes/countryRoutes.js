const express = require("express");
const router = express.Router();

const { authenticateJWT } = require("../middleware/auth");
const csrfProtection = require("../middleware/csrf");
const CountryService = require("../services/countryService");
const apiKeyMiddleware = require("../middleware/apiKeyAuthMiddleware");
const createResponse = require("../models/responseModel");

router.use(authenticateJWT);
router.use(csrfProtection);
router.use(apiKeyMiddleware);

router.get("/all", async (req, res) => {
  try {
    const { fields } = req.query;
    const countryService = new CountryService();

    const countries = await countryService.fetchAllCountries(fields);
    res.json(countries);
  } catch (error) {
    console.error(`Error when fetching all countries: ${error.message}`);
    res
      .status(500)
      .json(createResponse(false, null, "Failed to fetch countries"));
  }
});

router.get("/independent", apiKeyMiddleware, async (req, res) => {
  try {
    const { status, fields } = req.query;

    const countryService = new CountryService();
    const countries = await countryService.fetchCountriesByIndependence(
      status,
      fields
    );
    res.json(countries);
  } catch (error) {
    console.error(`Error when fetching all countries: ${error.message}`);
    res
      .status(500)
      .json(
        createResponse(false, null, "Failed to fetch independent countries")
      );
  }
});

router.get("/name", apiKeyMiddleware, async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      res
        .status(400)
        .json(createResponse(false, null, "Country name required"));
    }
    const { fullText } = req.query;

    const countryService = new CountryService();
    const country = await countryService.fetchCountryByName(name, fullText);
    res.json(country);
  } catch (error) {
    console.error(`Error when fetching all countries: ${error.message}`);
    res
      .status(500)
      .json(createResponse(false, null, "Failed to fetch countries by name"));
  }
});

module.exports = router;
