// models/User.js
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

// Define User schema
const User = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `;
    connection.execute(sql, (err, results) => {
      if (err) throw err;
      //   console.log("User table created:", results);
      console.log("User table created:");
    });
  },

  create: (username, email, password, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) throw err;
      const sql =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      connection.execute(sql, [username, email, hash], callback);
    });
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    connection.execute(sql, [email], callback);
  },
};

// User.createTable();
// User.create("admin", "admin@test.com", "password", (err, results) => {
//   if (err) throw err;
//   console.log("Admin user created:", results);
// });

module.exports = User;
