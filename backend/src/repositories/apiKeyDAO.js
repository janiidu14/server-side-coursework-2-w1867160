const { db } = require("../configs/db");

class APIKeyDAO {
  constructor() {}

  async getAllAPIKeys() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM api_keys", [], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  }

  async getKeyById(key) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM api_keys WHERE apiKey = ?", [key], (err, row) => {
        if (err) {
          return reject(err);
        }

        if (!row) {
          return resolve(null);
        }

        resolve(row);
      });
    });
  }

  async getKeysByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM api_keys WHERE userId = ?",
        [userId],
        (err, rows) => {
          if (err) {
            return reject(err);
          }

          resolve(rows);
        }
      );
    });
  }

  async createAPIKey(id, userId, apiKey) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE api_keys SET isActive = 0 WHERE userId = ? and isActive = 1",
        [userId],
        (err1) => {
          if (err1) {
            return reject(err1);
          }

          db.run(
            "INSERT INTO api_keys (id, userId, apiKey) VALUES (?, ?, ?)",
            [id, userId, apiKey],
            (err) => {
              if (err) {
                return reject(err);
              }

              resolve(true);
            }
          );
        }
      );
    });
  }

  async validateKey(key) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT isActive FROM api_keys WHERE apiKey = ? and isActive = 1",
        [key],
        (err, row) => {
          if (err) {
            return reject(err);
          }
          if (!row) {
            return resolve(false);
          }

          resolve(true);
        }
      );
    });
  }

  async validateKeyForUser(userId) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM api_keys WHERE isActive = 1 and userId = ?",
        [userId],
        (err, row) => {
          if (err) {
            return reject(err);
          }
          if (!row) {
            return resolve(false);
          }

          resolve(row);
        }
      );
    });
  }

  async deactivateKey(key) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE api_keys SET isActive = 0 WHERE apiKey = ?",
        [key],
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  async updateAPIKeyUsageCount(key) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE api_keys 
        SET usageCount = usageCount + 1, lastUsed = CURRENT_TIMESTAMP 
        WHERE id = ?`,
        [key],
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(true);
        }
      );
    });
  }
}

module.exports = APIKeyDAO;
