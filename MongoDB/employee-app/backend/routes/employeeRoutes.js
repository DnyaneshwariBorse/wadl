const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// ADD employee
router.post("/", async (req, res) => {
  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// GET all employees
router.get("/", async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;