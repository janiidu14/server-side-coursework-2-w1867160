const { db } = require("../configs/db");

class UserDAO {
  constructor() {}

  async createUser(userData) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)",
        [userData?.id, userData?.email, userData?.password, userData?.name],
        (err) => {
          if (err) {
            return reject(err);
          }

          resolve(true);
        }
      );
    });
  }

  async findByUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
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

  async findByUserById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
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

  async findAllUsers() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
          return reject(err);
        }

        resolve(rows);
      });
    });
  }
}

module.exports = UserDAO;
