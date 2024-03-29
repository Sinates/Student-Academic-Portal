const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: String,
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "batch",
    required: true
  },
  name: String,
  gender: String,
  email: String,
  
  password: {
    type: String,
    default: null,
  },
  phone: Number,
  guardianPhone: String,
  guardianName: String,
  department: String,
  aboutYou: String,
  academicRecord: String,
  role: String,
  restricted: {
    default: true,
    type: Boolean,
  },
  notifications: [
    {

      sender: String,
      message: String,
      file: String,
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("student", studentSchema);
