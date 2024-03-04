const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  id: String,
  name: String,
  gender: String,
  email: String,
  password: String,
  phone: Number,
  curriculumVitae: String,
  qualifications: String,
  certifications: String,
  interviewDate: Date,
});
module.exports = mongoose.model("teacher", newSchema);
