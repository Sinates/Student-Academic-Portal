const mongoose = require("mongoose");
const schema = mongoose.schema;

const newSchema = new schema({
  id: String,
  name: String,
  gender: Stirng,
  email: String,
  password: String,
  phone: Number,
  guardianPhone: Number,
});
