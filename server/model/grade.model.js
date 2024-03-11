const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  id: String,
  studentName: String,
  courseid: String,
  instructor: String,
  course: String,
  grade: String,
  mark: Number,
  file: String,
});

module.exports = mongoose.model("grade", newSchema);
