const { db } = require("../configs/db");

class BlogDAO {
  constructor() {}

  async createBlog(id, userId, data) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO blogs (id, title, content, country, visitDate, userId) VALUES (?, ?, ?, ?, ?, ?)",
        [
          id,
          data?.title,
          data?.content,
          data?.country,
          data?.visitDate,
          userId,
        ],
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  async getAllBlogs() {
    return new Promise((resolve, reject) => {
      db.all(
        `
        SELECT blogs.*, users.email AS author
        FROM blogs
        JOIN users ON blogs.userId = users.id
        ORDER BY blogs.createdAt DESC`,
        [],
        (err, rows) => {
          if (err) {
            return reject(err);
          }

          resolve(rows);
        }
      );
    });
  }

  async getBlogById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT blogs.*, users.email AS author
        FROM blogs JOIN users ON blogs.userId = users.id
        WHERE blogs.id = ?
      `,
        [id],
        (err, row) => {
          if (err) {
            return reject(err);
          }

          if (!row) {
            return resolve(null);
          }

          resolve(row);
        }
      );
    });
  }

  async updateBlogById(id, data) {
    return new Promise((resolve, reject) => {
      db.run(
        `
        UPDATE blogs SET title = ?, content = ?, country = ?, updatedAt = datetime('now')
        WHERE id = ?
      `,
        [data.title, data.content, data.country, id],
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  async deleteBlogById(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM blogs WHERE id = ?`, [id], (err) => {
        if (err) {
          return reject(err);
        }

        resolve(true);
      });
    });
  }

  async getAllBlogsWithSort(userId, sort = "newest") {
    const orderBy =
      {
        newest: "b.created_at DESC",
        likes: "likes DESC",
        comments: "commentCount DESC",
      }[sort] || "b.created_at DESC";

    return new Promise((resolve, reject) => {
      db.all(
        `SELECT 
        b.id, b.title, b.content, b.country, b.created_at, u.email AS author,
        COUNT(DISTINCT r.id) FILTER (WHERE r.type = 'like') AS likes,
        COUNT(DISTINCT c.id) AS commentCount,
        (
          SELECT type FROM reactions r2 WHERE r2.blogId = b.id
        ) AS myReaction
        FROM blogs b
        JOIN users u ON b.userId = u.id
        LEFT JOIN reactions r ON r.blogId = b.id
        LEFT JOIN comments c ON c.blogId = b.id
        GROUP BY b.id
        ORDER BY ${orderBy}
        `,
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
}

module.exports = BlogDAO;
