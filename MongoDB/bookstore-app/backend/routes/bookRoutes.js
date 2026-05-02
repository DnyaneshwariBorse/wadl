const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// ADD
router.post("/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
});

// GET
router.get("/", async (req, res) => {
  const data = await Book.find();
  res.json(data);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;