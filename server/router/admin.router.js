const express = require("express");
const Admin = require("../model/admin.model");
const studentModel = require("../model/student.model");
const payment = require("../model/payment.model");

const router = express.Router();

router.post("/verifypayment", (req, res) => {
    const studentId = req.body.id;

    // Check if the payment entry exists
    payment.findOne({ id: studentId })
      .then((paymentEntry) => {
        if (!paymentEntry) {
          // Payment entry not found
          return res.status(404).json({ error: "Payment entry not found" });
        }

        // Update the payment verification status
        paymentEntry.verified = true;
        paymentEntry.save()
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
    studentModel.findOne({ id: studentId })
        .then((student) => {
            if (!student) {
                // Student not found
                return res.status(404).json({ error: "Student not found" });
            }

            // Update the student's verification status
            student.restricted = false;
            student.save()
                .then(() => {
                    res.status(200).json({ message: "Student sign-up verified successfully" });
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
    studentModel.find({ restricted: true })
        .then((students) => {
            res.status(200).json(students);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
});

module.exports = router;
