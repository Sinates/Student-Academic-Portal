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
    const fileName = req.file.originalname;

    console.log("File name:", fileName); // Log the file name

    // Extract instructor name, course name, and batch from the file name
    const fileNameParts = fileName.split("-");
    console.log("File name parts:", fileNameParts); // Log the file name parts

    if (fileNameParts.length !== 3 || !fileName.endsWith(".xlsx")) {
      return res.status(400).json({ error: "Invalid file name format" });
    }

    const instructorName = fileNameParts[0].trim();
    const course = fileNameParts[1].trim();
    const batch = fileNameParts[2].trim().split(".")[0];

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
        instructor: instructorName,
        course: course,
        batch: batch,
        studentName: Name,
        id: ID,
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
