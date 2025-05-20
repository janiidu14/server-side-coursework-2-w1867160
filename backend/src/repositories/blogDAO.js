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
}

module.exports = BlogDAO;
