const express = require("express");
const studentModel = require("../model/student.model");
const router = express.Router();
const fileUpload = require("express-fileupload");
const app = express();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Define the destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Define the filename for the uploaded file
  },
});

const path = require("path");
const { error } = require("console");

function generateID() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";

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

// Configure Multer to restrict the maximum file size to 5MB

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Define the destination directory for file uploads
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Define the filename for the uploaded file
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Handle POST request to register a new student with file upload for academic record
router.post("/register", (req, res) => {
  // Check if the provided email already exists
  studentModel
    .findOne({ email: req.body.email })
    .then((existingEmail) => {
      if (existingEmail) {
        // Email already exists
        return res.status(409).json({ error: "Email already exists" });
      } else {
        // Check if the provided ID already exists
        studentModel
          .findOne({ id: generateID() })
          .then((existingID) => {
            if (existingID) {
              // ID already exists
              return res.status(409).json({ error: "ID already exists" });
            } else {
              // Both email and ID are unique, perform file upload
              upload.single("academicRecord")(req, res, (err) => {
                if (err) {
                  // Error during file upload
                  console.error(err);
                  return res.status(500).json({ error: "File upload error" });
                }

                // File uploaded successfully, create and save the new student
                const newStudent = new studentModel({
                  id: generateID(), // Use provided ID
                  name: req.body.name,
                  gender: req.body.gender,
                  email: req.body.email,
                  phone: req.body.phone,
                  guardianName: req.body.guardianName,
                  guardianPhone: req.body.guardianPhone,
                  department: req.body.department,
                  aboutYou: req.body.aboutYou,
                  academicRecord: req.file ? req.file.filename : null, // Save filename if file is uploaded
                });

                newStudent
                  .save()
                  .then((savedStudent) => {
                    res.status(201).json(savedStudent);
                  })
                  .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                  });
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
});
router.put("/signup/:id", (req, res) => {
  const approvedStudent = new student({
    id: req.params.id,
    password: req.body.password,
  });
  student
    .updateOne({ id: req.params.id }, approvedStudent)
    .then(() => {
      res.status(201).json({
        massage: "Student account verified!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
module.exports = router;
