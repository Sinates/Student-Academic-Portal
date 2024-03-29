const mongoose = require("mongoose");

const newBatchSchema = new mongoose.Schema({
  batchName: String,
    courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "course"
  }]
}, {timestamps:true});

module.exports = mongoose.model("batch", newBatchSchema);
