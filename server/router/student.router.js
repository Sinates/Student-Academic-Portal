const express = require("express");

const studentModel = require("../model/student.model");
const router = express.Router();

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
              // Both email and ID are unique, create and save the new student
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
                academicRecord: req.body.academicRecord,
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

module.exports = router;
