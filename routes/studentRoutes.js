const express = require("express");
const router = express.Router();
const students = require("../data/students");

let nextId = 4;

router.get("/", (req, res) => {
  res.status(200).json(students);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const course = req.body.course;

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  const newStudent = {
    id: nextId,
    name: name,
    course: course
  };
  nextId++;

  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const name = req.body.name;
  const course = req.body.course;

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  student.name = name;
  student.course = course;
  res.status(200).json(student);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deleted = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted", student: deleted[0] });
});

module.exports = router;
