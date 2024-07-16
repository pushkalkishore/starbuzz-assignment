// routes/posts.js
const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

// Create post
router.post("/", (req, res) => {
  const { title, content, author } = req.body;
  BlogPost.create(title, content, author, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.status(201).json({ message: "Post created", postId: results.insertId });
  });
});

// Read all posts
router.get("/", (req, res) => {
  BlogPost.getAll((err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results);
  });
});

// Read a single post by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  BlogPost.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(results[0]);
  });
});

// Update post
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  BlogPost.update(id, title, content, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Post updated" });
  });
});

// Delete post
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  BlogPost.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ message: "Post deleted" });
  });
});

module.exports = router;
