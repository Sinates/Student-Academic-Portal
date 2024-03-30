const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  id: String,
  name: String,
  gender: String,
  email: String,
  password: String,
  phone: Number,
  restricted: {
    type: Boolean,
    default: true,
  },
  curriculumVitae: String,
  qualifications: String,
  certifications: String,
  interviewDate: Date,
  assignedCourses: [String],
  batch: {
    type: Array,
    required: [true, "Please Add batch"],
  },
  course: {
    type: Array,
    required: [true, "Please Add course"],
  },
  role: String,
  changeRequests: [
    {
      course: String,
      requestId: String,
      sender: String,
      message: String,
      mid: String,
      final: String,
      assessment: String,
      approved: {
        type: Boolean,
        default: false,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = mongoose.model("teacher", teacherSchema);
