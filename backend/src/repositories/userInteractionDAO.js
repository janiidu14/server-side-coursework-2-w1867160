const { db } = require("../configs/db");

class UserInteractionDAO {
  constructor() {}

  async createInteraction(id, followerId, followingId) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO interactions (id, followerId, followingId) VALUES (?, ?, ?)`,
        [id, followerId, followingId],
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  async getFollowersByUserId(userId) {
    console.log("getFollowersByUserId", userId);
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT users.id, users.email
        FROM interactions JOIN users ON interactions.followerId = users.id
        WHERE interactions.followingId = ?`,
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

  async getFollowingByUserId(userId) {
        console.log("getFolloweingByUserId", userId);
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT users.id, users.email
        FROM interactions JOIN users ON interactions.followingid = users.id
        WHERE interactions.followerId = ?`,
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

  async deleteInteractionById(followerId, followingId) {
    return new Promise((resolve, reject) => {
      db.all(
        `DELETE FROM interactions WHERE followerId = ? AND followingId = ?`,
        [followerId, followingId],
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  async getAllInteractions() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM interactions`, [], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  }
}

module.exports = UserInteractionDAO;
