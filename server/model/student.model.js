const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  id: String,
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
  restricted: {
    default: true,
    type: Boolean,
  },
});
module.exports = mongoose.model("student", newSchema);
