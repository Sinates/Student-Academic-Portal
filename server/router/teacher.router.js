const express = require("express");
const teacherModel = require("../model/teacher.model");
const studentModel = require("../model/student.model");
const router = express.Router();
const gradeModel = require("../model/grade.model");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");
const multer = require("multer");
function generateID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "TR" + "";

  // Generate two random letters
  for (let i = 0; i < 2; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate four random numbers
  for (let i = 0; i < 4; i++) {
    id += Math.floor(Math.random() * 10);
  }

  return id;
}
router.get("/response", (req, res) => {
  res.status(200).json({ reponse: "Responds Perfectly" });
});

// Define storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/teacher"); // Save uploaded files to the 'uploads/teacher' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

// Initialize multer upload with defined storage
const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.fields([
    { name: "curriculumVitae", maxCount: 1 },
    { name: "qualifications", maxCount: 1 },
    { name: "certifications", maxCount: 1 },
  ]),
  (req, res) => {
    // Check if the provided email already exists
    teacherModel
      .findOne({ email: req.body.email })
      .then((existingEmail) => {
        if (existingEmail) {
          // Email already exists
          return res.status(409).json({ error: "Email already exists" });
        } else {
          // Check if the provided ID already exists
          teacherModel
            .findOne({ id: generateID() })
            .then((existingID) => {
              if (existingID) {
                // ID already exists
                return res.status(409).json({ error: "ID already exists" });
              } else {
                // Both email and ID are unique, perform file upload
                // Retrieve uploaded files
                const files = req.files;
                const uploadedCV = files["curriculumVitae"][0];
                const uploadedQualifications = files["qualifications"][0];
                const uploadedCertifications = files["certifications"][0];

                // Create and save the new teacher
                const newTeacher = new teacherModel({
                  id: generateID(), // Use provided ID
                  name: req.body.name,
                  gender: req.body.gender,
                  email: req.body.email,
                  phone: req.body.phone,
                  curriculumVitae: uploadedCV ? uploadedCV.filename : null,
                  qualifications: uploadedQualifications
                    ? uploadedQualifications.filename
                    : null,
                  certifications: uploadedCertifications
                    ? uploadedCertifications.filename
                    : null,
                  interviewDate: req.body.date,
                });

                newTeacher
                  .save()
                  .then((savedTeacher) => {
                    res.status(201).json(savedTeacher);
                  })
                  .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                  });
              }
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: "Internal server error" });
            });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

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
router.post("/sendnotifications", async (req, res) => {
  try {
    const { batch, notification } = req.body;

    // Find all students in the specified batch
    const students = await studentModel.find({ batch });

    if (!students || students.length === 0) {
      return res.status(404).json({ error: "No students found in the specified batch." });
    }

    // Add the notification to each student's notifications array
    for (const student of students) {
      student.notifications.push(notification);
      await student.save();
    }

    return res.status(200).json({ message: "Notifications sent successfully." });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});


module.exports = router;
