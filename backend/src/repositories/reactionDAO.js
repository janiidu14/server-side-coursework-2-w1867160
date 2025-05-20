const { db } = require("../configs/db");

class ReactionDAO {
  constructor() {}

  async createReaction(id, userId, blogId, type) {
    console.log(id, userId, blogId, type)
    return new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM reactions WHERE blogId = ? AND userId = ?",
        [blogId, userId],
        (err, existing) => {
          if (err) return reject(err);

          if (existing) {
            if (existing.type === type) {
              db.run(
                "DELETE FROM reactions WHERE blogId = ? AND userId = ?",
                [blogId, userId],
                (err) => {
                  if (err) return reject(err);
                  resolve("removed");
                }
              );
            } else {
              db.run(
                "UPDATE reactions SET type = ? WHERE blogId = ? AND userId = ?",
                [type, blogId, userId],
                (err) => {
                  if (err) return reject(err);
                  resolve("updated");
                }
              );
            }
          } else {
            db.run(
              "INSERT INTO reactions (id, blogId, userId, type) VALUES (?, ?, ?, ?)",
              [id, blogId, userId, type],
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

  async getAllReactions() {
     return new Promise((resolve, reject) => {
       db.all("SELECT * FROM reactions", [], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  }

  async getReactionCounts(blogId) {
    const db = await connectDB();
    return new Promise((resolve, reject) => {
      const counts = {};
      db.get(
        'SELECT COUNT(*) AS count FROM reactions WHERE blogId = ? AND type = "like"',
        [blogId],
        (err, likeRow) => {
          if (err) return reject(err);
          counts.likes = likeRow.count;

          db.get(
            'SELECT COUNT(*) AS count FROM reactions WHERE blogId = ? AND type = "dislike"',
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

  async getAllReactionSummaries(userId) {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT
        blogId AS blogId,
        COUNT(CASE WHEN type = 'like' THEN 1 END) AS likes,
        COUNT(CASE WHEN type = 'dislike' THEN 1 END) AS dislikes,
        (
          SELECT type FROM reactions r2 
          WHERE r2.blogId = r1.blogId AND r2.userId = ?
        ) AS myReaction
      FROM reactions r1
      GROUP BY blogId
      `,
      [userId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

async getUserReactionToAllBlogsPublic() {
  return new Promise((resolve, reject) => {
    db.all(
      `
      SELECT
        blogId AS blogId,
        COUNT(CASE WHEN type = 'like' THEN 1 END) AS likes,
        COUNT(CASE WHEN type = 'dislike' THEN 1 END) AS dislikes
      FROM reactions
      GROUP BY blogId
      `,
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
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
