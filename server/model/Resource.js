const mongoose = require("mongoose");
const resourceSchema = mongoose.Schema(
  {
    resourceName: {
      type: String,
      required: [true, "Please enter resource Name"],
    },
    course_Id: {
      type: mongoose.Schema.Types.ObjectId,
      require,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("resource", resourceSchema);
