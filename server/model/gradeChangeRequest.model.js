const mongoose = require("mongoose");

const gradeChangeRequestSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true
  },
  optionalNote: {
    type: String,
    required: false
},
  typeOfAssessment: {
    type: String,
    enum: ["Final", "Assessment", "Mid"],
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default:false
  }

});

module.exports = mongoose.model("GradeChangeRequest", gradeChangeRequestSchema);
