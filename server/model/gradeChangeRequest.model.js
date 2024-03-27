const mongoose = require("mongoose");

const gradeChangeRequestSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  optionalNote: {
    type: Number,
    required: false
},
  typeOfAssessment: {
    type: String,
    enum: ["Final", "Assessment", "Mid"],
    required: true,
  },

});

module.exports = mongoose.model("CourseStudent", gradeChangeRequestSchema);
