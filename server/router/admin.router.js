  const express = require("express");
  const Admin = require("../model/admin.model");
  const studentModel = require("../model/student.model");
  const payment = require("../model/payment.model");
  const courseModel = require("../model/course.model");
  const router = express.Router();

  router.post("/verifypayment", (req, res) => {
    const studentId = req.body.id;

    // Check if the payment entry exists
    payment
      .findOne({ id: studentId })
      .then((paymentEntry) => {
        if (!paymentEntry) {
          // Payment entry not found
          return res.status(404).json({ error: "Payment entry not found" });
        }

        // Update the payment verification status
        paymentEntry.verified = true;
        paymentEntry
          .save()
          .then(() => {
            res.status(200).json({ message: "Payment verified successfully" });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  });
  router.post("/verifystudent", (req, res) => {
    const studentId = req.body.id;

    // Check if the student exists
    studentModel
      .findOne({ id: studentId })
      .then((student) => {
        if (!student) {
          // Student not found
          return res.status(404).json({ error: "Student not found" });
        }

        // Update the student's verification status
        student.restricted = false;
        student
          .save()
          .then(() => {
            res
              .status(200)
              .json({ message: "Student sign-up verified successfully" });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  });

  // Endpoint to retrieve all students with restricted value as true
  router.get("/restricted", (req, res) => {
    // Find all students where restricted value is true
    studentModel
      .find({ restricted: true })
      .then((students) => {
        res.status(200).json(students);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  });
  // Endpoint to create a new course
  router.post("/courses", async (req, res) => {
    try {
      // Extract course name and courseId from request body
      const { name, courseId } = req.body;

      // Check if the courseId already exists
      const existingCourse = await courseModel.findOne({ courseId });

      // If courseId already exists, return an error
      if (existingCourse) {
        return res.status(400).json({ error: "Course ID already exists" });
      }

      // Create a new course instance
      const newCourse = new courseModel({
        courseName: req.body.name,
        courseid: req.body.courseId,
      });

      // Save the new course to the database
      const savedCourse = await newCourse.save();

      // Return the saved course as the response
      res.status(201).json(savedCourse);
    } catch (error) {
      // If an error occurs, return an error response
      console.error("Error creating course:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  router.post("/banstudent", (req, res) => {
    const studentId = req.body.id;

    // Check if the student exists
    studentModel
      .findOne({ id: studentId })
      .then((student) => {
        if (!student) {
          // Student not found
          return res.status(404).json({ error: "Student not found" });
        }

        // Update the student's verification status
        student.banned = true;
        student
          .save()
          .then(() => {
            res
              .status(200)
              .json({ message: "Student banned successfully" });
          })
          .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
          });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
      });
  });
  router.get("/getbatches", async (req, res) => {
    try {
      const uniqueBatches = await studentModel.distinct("batch");
      res.status(200).json({ batches: uniqueBatches });
    } catch (error) {
      console.error("Error retrieving unique batches:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  router.get("/getstudents", async (req, res) => {
    const { batch } = req.body;
  
    try {
      const studentsInBatch = await studentModel.find({ batch: batch }, { name: 1, _id: 0 });
      if (studentsInBatch.length === 0) {
        return res.status(404).json({ error: "No students found in the batch" });
      }
      const studentNames = studentsInBatch.map(student => student.name);
      res.status(200).json({ students: studentNames });
    } catch (error) {
      console.error(`Error retrieving students in batch ${batch}:`, error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  module.exports = router;
