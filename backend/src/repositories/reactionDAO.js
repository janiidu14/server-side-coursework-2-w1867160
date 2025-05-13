const { db } = require("../configs/db");

class ReactionDAO {
  constructor() {}

  async setReaction(userId, blogId, type) {
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM reactions WHERE blog_id = ? AND user_id = ?",
        [blogId, userId],
        (err, existing) => {
          if (err) return reject(err);

          if (existing) {
            if (existing.type === type) {
              db.run(
                "DELETE FROM reactions WHERE blog_id = ? AND user_id = ?",
                [blogId, userId],
                (err) => {
                  if (err) return reject(err);
                  resolve("removed");
                }
              );
            } else {
              db.run(
                "UPDATE reactions SET type = ? WHERE blog_id = ? AND user_id = ?",
                [type, blogId, userId],
                (err) => {
                  if (err) return reject(err);
                  resolve("updated");
                }
              );
            }
          } else {
            db.run(
              "INSERT INTO reactions (blog_id, user_id, type) VALUES (?, ?, ?)",
              [blogId, userId, type],
              (err) => {
                if (err) return reject(err);
                resolve("added");
              }
            );
          }
        }
      );
    });
  }

  async getReactionCounts(blogId) {
    const db = await connectDB();
    return new Promise((resolve, reject) => {
      const counts = {};
      db.get(
        'SELECT COUNT(*) AS count FROM reactions WHERE blog_id = ? AND type = "like"',
        [blogId],
        (err, likeRow) => {
          if (err) return reject(err);
          counts.likes = likeRow.count;

          db.get(
            'SELECT COUNT(*) AS count FROM reactions WHERE blog_id = ? AND type = "dislike"',
            [blogId],
            (err, dislikeRow) => {
              if (err) return reject(err);
              counts.dislikes = dislikeRow.count;
              resolve(counts);
            }
          );
        }
      );
    });
  }

  async getUserReaction(userId, blogId) {
    const db = await connectDB();
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT type FROM reactions WHERE blog_id = ? AND user_id = ?",
        [blogId, userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row || {});
        }
      );
    });
  }
}

module.exports = ReactionDAO;
