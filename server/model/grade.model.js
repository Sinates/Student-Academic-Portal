const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  id: String,
  studentName: String,
  courseid: String,
  instructor: String,
  course: String,
  grade: String,
  mid: Number,
  final: Number,
  assessment: Number,
  total: Number,
  file: String,
  batch: String,
  attendance: [ String]
});

module.exports = mongoose.model("grade", newSchema);
