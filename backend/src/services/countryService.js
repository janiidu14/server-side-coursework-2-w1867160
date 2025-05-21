const axios = require("axios");
const { REST_COUNTRIES_BASE_URL } = require("../configs/dotenv");
const createResponse = require("../models/responseModel");

const BASE_URL = REST_COUNTRIES_BASE_URL;

class CountryService {
  constructor() {}

  mapCountryData(country) {
    return {
      name: country.name.common,
      currency: country.currencies,
      capital: country.capital,
      code: country.ccn3,
      languages: country.languages,
      flag: country.flags?.png,
    };
  }

  async fetchAllCountries(fields = null) {
    try {
      const response = await axios.get(`${BASE_URL}/all`, {
        params: { fields },
      });
      const data = response.data.map(this.mapCountryData);
      return createResponse(true, data, "Countries fetched successfully");
    } catch (error) {
      throw new Error("Error retrieving all countries");
    }
  }

  async fetchCountriesByIndependence(status = true, fields = null) {
    try {
      const response = await axios.get(`${BASE_URL}/independent`, {
        params: { status, fields },
      });
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Independent countries fetched successfully"
      );
    } catch (error) {
      throw new Error("Error retrieving countries by independent");
    }
  }

  async fetchCountryByName(name, fullText = true) {
    try {
      const response = await axios.get(`${BASE_URL}/name/${name}`, {
        params: { fullText },
      });
      const data = response.data.map(this.mapCountryData);
      console.log(data);
      return createResponse(true, data, "Country fetched by name successfully");
    } catch (error) {
      throw new Error(`Error retrieving country with name: ${name}`);
    }
  }

  async fetchCountriesByAlphaCode(alphaCode) {
    try {
      const response = await axios.get(`${BASE_URL}/alpha/${alphaCode}`);
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Country fetched by alpha code successfully"
      );
    } catch (error) {
      throw new Error(
        `Error retrieving countries with alpha code: ${alphaCode}`
      );
    }
  }

  async fetchCountriesByAlphaCodes(codes) {
    try {
      const response = await axios.get(`${BASE_URL}/alpha`, {
        params: { codes },
      });
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Countries fetched by alpha codes successfully"
      );
    } catch (error) {
      throw new Error(`Error retrieving countries with codes: ${codes}`);
    }
  }

  async fetchCountriesByCurrency(currency) {
    try {
      const response = await axios.get(`${BASE_URL}/currency/${currency}`);
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Countries fetched by currency successfully"
      );
    } catch (error) {
      throw new Error(`Error retrieving countries with currency: ${currency}`);
    }
  }

  async fetchCountriesByDemonym(demonym) {
    try {
      const response = await axios.get(`${BASE_URL}/demonym/${demonym}`);
      const data = response.data.map(this.mapCountryData);
      return createResponse(true, data, "Countries fetched successfully");
    } catch (error) {
      throw new Error(`Error retrieving countries with demonym: ${demonym}`);
    }
  }

  async fetchCountriesByLanguage(lang) {
    try {
      const response = await axios.get(`${BASE_URL}/lang/${lang}`);
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Countries fetched by language successfully"
      );
    } catch (error) {
      throw new Error(`Error retrieving countries with language: ${lang}`);
    }
  }

  async fetchCountriesByRegion(region) {
    try {
      const response = await axios.get(`${BASE_URL}/region/${region}`);
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Countries fetched by region successfully"
      );
    } catch (error) {
      throw new Error(`Error retrieving countries with region: ${region}`);
    }
  }

  async fetchCountriesBySubRegion(subregion) {
    try {
      const response = await axios.get(`${BASE_URL}/subregion/${subregion}`);
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Countries fetched by subregion successfully"
      );
    } catch (error) {
      throw new Error(
        `Error retrieving countries with subregion: ${subregion}`
      );
    }
  }

  async fetchCountriesByTranslation(translation) {
    try {
      const response = await axios.get(
        `${BASE_URL}/translation/${translation}`
      );
      const data = response.data.map(this.mapCountryData);
      return createResponse(
        true,
        data,
        "Countries fetched by translation successfully"
      );
    } catch (error) {
      throw new Error(
        `Error retrieving countries with translation: ${translation}`
      );
    }
  }
}

module.exports = CountryService;
