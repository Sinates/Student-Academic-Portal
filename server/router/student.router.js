const express = require("express");
const studentModel = require("../model/student.model");
const router = express.Router();
const multer = require("multer");
const crypto = require("crypto");

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

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

//TODO: Make sure to add frontend comparison of password and confirmation
router.post("/signup", async (req, res) => {
  try {
    const id = req.body.id;
    const password = req.body.password;
    const hashedPassword = getHashedPassword(password);

    const result = await studentModel.findOneAndUpdate(
      { id: id },
      { password: hashedPassword }
    );

    if (!result) {
      return res.status(404).json({ error: "ID couldn't be found!" });
    }

    return res.status(201).json({ message: "User Signup completed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
