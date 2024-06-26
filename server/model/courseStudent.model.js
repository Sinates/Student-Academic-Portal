const mongoose = require("mongoose");

const courseStudentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  grade: String,
});

module.exports = mongoose.model("courseStudent", courseStudentSchema);
