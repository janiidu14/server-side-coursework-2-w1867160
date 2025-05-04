const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const APIKeyDAO = require("../repositories/apiKeyDAO");
const createResponse = require("../models/responseModel");

class APIKeyService {
  constructor() {
    this.apiKeyDAO = new APIKeyDAO();
  }

  async getAllKeys() {
    try {
      const keys = await this.apiKeyDAO.getAllAPIKeys();
      return createResponse(true, keys, "API Keys fetched successfully");
    } catch (error) {
      throw new Error(`Error fetching API keys: ${error.message}`);
    }
  }

  async createAPIKey(userId) {
    try {
      const id = uuidv4();
      const apiKey = crypto.randomBytes(24).toString("hex");
      const key = this.apiKeyDAO.createAPIKey(id, userId, apiKey);
      delete key?.apiKey;
      return createResponse(true, key, "API Key created successfully");
    } catch (error) {
      throw new Error(`Error creating API key: ${error.message}`);
    }
  }

  async validateKey(key) {
    try {
      const validKey = await this.apiKeyDAO.validateKey(key);
      if (!validKey) {
        return createResponse(false, null, "Invalid API Key");
      }
      return createResponse(true, key, "API Key is valid");
    } catch (error) {
      throw new Error(`Error validating API key: ${error.message}`);
    }
  }

  async validateKeyForUser(userId) {
    try {
      const validKey = await this.apiKeyDAO.validateKeyForUser(userId);
      if (!validKey) {
        return createResponse(false, null, "Invalid API Key");
      }
      return createResponse(true, validKey, "API Key is valid");
    } catch (error) {
      throw new Error(`Error validating API key: ${error.message}`);
    }
  }

  async getKeysByUserId(userId) {
    try {
      const keys = await this.apiKeyDAO.getKeysByUserId(userId);
      if (!keys) {
        return createResponse(false, null, "No API Keys found for this user");
      }
      return createResponse(true, keys, "API Keys fetched successfully");
    } catch (error) {
      throw new Error(
        `Error fetching API keys for user ${userId}: ${error.message}`
      );
    }
  }

  async deactivateKey(key) {
    try {
      const existingKey = await this.apiKeyDAO.getKeyById(key);
      if (!existingKey) {
        return createResponse(false, null, "API Key not found");
      }

      const isDeactivated = await this.apiKeyDAO.deactivateKey(key);
      if (!isDeactivated) {
        return createResponse(false, null, "Failed to deactivate API Key");
      }
      return createResponse(true, null, "API Key deactivated successfully");
    } catch (error) {
      throw new Error(`Error deactivating API key: ${error.message}`);
    }
  }

  async getKeyById(key) {
    try {
      const existingKey = await this.apiKeyDAO.getKeyById(key);
      if (!existingKey) {
        return createResponse(false, null, "API Key not found");
      }
      return createResponse(true, existingKey, "API Key fetched successfully");
    } catch (error) {
      throw new Error(`Error fetching API key: ${error.message}`);
    }
  }

  async updateAPIKeyUsageCount(key) {
    try {
      const isUpdated = await this.apiKeyDAO.updateAPIKeyUsageCount(key);
      if (!isUpdated) {
        return createResponse(false, null, "Failed to update API Key usage");
      }
      return createResponse(true, null, "API Key usage updated successfully");
    } catch (error) {
      throw new Error(`Error updating API key usage: ${error.message}`);
    }
  }
}

module.exports = APIKeyService;
