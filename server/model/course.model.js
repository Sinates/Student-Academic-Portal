const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  id: String,
  courseid: String,
  courseName: String,
  year: Number,
  instructor: String,
  credithour: Number,
});

module.exports = mongoose.model("course", newSchema);
