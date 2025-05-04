const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});


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
        else console.log("Users table ready");
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
        else console.log("API keys table ready");
      }
    );
  });
};

module.exports = {
  db,
  initializeDB,
};
