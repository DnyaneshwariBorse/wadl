const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

mongoose.connect("mongodb://127.0.0.1:27017/books")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});