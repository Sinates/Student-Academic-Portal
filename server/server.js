const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = 8000 || process.env.PORT;
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);

app.use(cors());

app.use("/teacher", require("./router/teacher.router"));
app.use("/admin", require("./router/admin.router"));
app.use("/student", require("./router/student.router"));
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
