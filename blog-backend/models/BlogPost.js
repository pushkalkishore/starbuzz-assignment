// models/BlogPost.js
const mysql = require("mysql2");
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

const BlogPost = {
  createTable: () => {
    const sql = `
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    connection.execute(sql, (err, results) => {
      if (err) throw err;
      // console.log("BlogPost table created:", results);
      console.log("BlogPost table created:");
    });
  },

  create: (title, content, author, callback) => {
    const sql =
      "INSERT INTO blog_posts (title, content, author) VALUES (?, ?, ?)";
    connection.execute(sql, [title, content, author], callback);
  },

  getAll: (callback) => {
    const sql = "SELECT * FROM blog_posts";
    connection.execute(sql, callback);
  },

  getById: (id, callback) => {
    const sql = "SELECT * FROM blog_posts WHERE id = ?";
    connection.execute(sql, [id], callback);
  },

  update: (id, title, content, callback) => {
    const sql = "UPDATE blog_posts SET title = ?, content = ? WHERE id = ?";
    connection.execute(sql, [title, content, id], callback);
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM blog_posts WHERE id = ?";
    connection.execute(sql, [id], callback);
  },
};

// BlogPost.createTable();
// BlogPost.create("Hello", "Hello, world!", "admin", (err, results) => {
//   if (err) throw err;
//   console.log("BlogPost created:", results);
// });

module.exports = BlogPost;
