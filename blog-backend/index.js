// index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const BlogPost = require("./models/BlogPost");
const User = require("./models/User");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/posts", require("./routes/Posts"));
app.use("/auth", require("./routes/Auth"));

// Create tables
BlogPost.createTable();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
