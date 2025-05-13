const { db } = require("../configs/db");

class UserInteractionDAO {
  constructor() {}

  async createInteraction(followerId, followingId) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO interactions (follower_id, following_id) VALUES (?, ?)`,
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

  async getFollowersByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT users.id, users.email
        FROM interactions JOIN users ON interactions.followerid = users.id
        WHERE interactions.followingid = ?`,
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
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT users.id, users.email
        FROM interactions JOIN users ON interactions.followingid = users.id
        WHERE interactions.followerid = ?`,
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

  async deleteInteractionById() {
    return new Promise((resolve, reject) => {
      db.all(
        `DELETE FROM interactions WHERE follower_id = ? AND following_id = ?`,
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
