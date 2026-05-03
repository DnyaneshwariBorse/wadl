const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve index.html explicitly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/employees")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// routes
const employeeRoutes = require("./routes/employeeRoutes");
app.use("/api/employees", employeeRoutes);

// start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});