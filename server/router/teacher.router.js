const express = require("express");
const Admin = require("../model/teacher.model");
const router = express.Router();

router.get("/response", (req, res) => {
  res.status(200).json({ reponse: "Responds Perfectly" });
});
router.post("/register", (req, res) => {
  res.status(200).json({ reponse: "Responds Perfectly" });
});
module.exports = router;
