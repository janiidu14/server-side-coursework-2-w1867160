const { db } = require("../configs/db");

const initializeDB = () => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                name TEXT NOT NULL,
                password TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                lastLoggedIn DATETIME
            )`,
      (err) => {
        if (err) console.error("Error creating users table:", err.message);
        else console.info("Users table ready");
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS api_keys (
                id TEXT PRIMARY KEY,
                userId TEXT NOT NULL,
                apiKey TEXT UNIQUE NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                lastUsed DATETIME,
                usageCount INTEGER DEFAULT 0,
                isActive BOOLEAN DEFAULT 1,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            )`,
      (err) => {
        if (err) console.error("Error creating api_keys table:", err.message);
        else console.info("API keys table ready");
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS blogs (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                country TEXT NOT NULL,
                visitDate TEXT NOT NULL,
                userId TEXT NOT NULL,
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );`,
      (err) => {
        if (err) console.error("Error creating blogs table:", err.message);
        else console.info("Blogs table ready");
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS reactions (
                id TEXT PRIMARY KEY,
                blogId TEXT NOT NULL,
                userId TEXT NOT NULL,
                type TEXT CHECK (type IN ('like', 'dislike')),
                comment TEXT,
                lastActionAt TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (blogId, userId),
                FOREIGN KEY (blogId) REFERENCES blogs(id) ON DELETE CASCADE,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );`,
      (err) => {
        if (err) console.error("Error creating reactions table:", err.message);
        else console.info("Reactions table ready");
      }
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS interactions (
                id TEXT PRIMARY KEY,
                followerId TEXT NOT NULL,
                followingId TEXT NOT NULL,
                lastActionAt TEXT DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (followerId, followingId),
                FOREIGN KEY (followerId) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (followingId) REFERENCES users(id) ON DELETE CASCADE
    );`,
      (err) => {
        if (err)
          console.error("Error creating interactions table:", err.message);
        else console.info("Interactions table ready");
      }
    );
  });
};

module.exports = {
  initializeDB,
};
