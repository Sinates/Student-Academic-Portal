const express = require("express");
const Admin = require("../model/teacher.model");
const router = express.Router();
const gradeModel = require("../model/grade.model");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const multer = require("multer");

router.get("/response", (req, res) => {
  res.status(200).json({ reponse: "Responds Perfectly" });
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/grades"); // Save uploaded files to the 'uploads/grades' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
});

router.post("/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Extract instructor name and course name from the file name
    const fileName = req.file.originalname;
    const fileNameParts = fileName.split("-");

    if (fileNameParts.length !== 2) {
      return res.status(400).json({ error: "Invalid file name format" });
    }

    const [instructorName, courseNameWithExtension] = fileNameParts;
    const courseName = courseNameWithExtension.split(".")[0];

    // Read the uploaded Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Process the data and populate fields accordingly
    data.forEach((row) => {
      const { Name, ID, Grade, Mark } = row;

      // Populate fields and save to database
      const newGrade = new gradeModel({
        course: courseName,
        instructorName: instructorName,
        studentName: Name,
        studentID: ID,
        grade: Grade,
        mark: Mark,
        file: req.file ? req.file.filename : null, // Use req.file.filename to get the file name
      });

      // Save the grade to the database
      newGrade.save().then(() => {
        console.log("Grade uploaded:", row);
      });
    });

    // Delete the uploaded file after processing
    fs.unlinkSync(filePath);

    res
      .status(200)
      .json({ message: "Excel data uploaded and grades added successfully" });
  } catch (error) {
    console.error("Error uploading file and processing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
