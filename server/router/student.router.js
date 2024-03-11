const express = require("express");
const studentModel = require("../model/student.model");
const payment = require("../model/payment.model");

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
      cb(null, "uploads/files"); // Define the destination directory for file uploads
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Define the filename for the uploaded file
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});
const uploadpayment = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/payments"); // Define the destination directory for file uploads
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
    const restriction = req.body.restriction;
    const hashedPassword = getHashedPassword(req.body.password);

    const result = await studentModel.findOneAndUpdate(
      { id: id },
      { password: hashedPassword }
    );

    if (!result) {
      return res.status(404).json({ error: "User doesn't exist!" });
    }
    //FIXME: check wether student is restricted or not

    return res.status(201).json({ message: "User Signup completed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/signin", (req, res) => {
  studentModel.findOne({
    id: req.body.id
  }).then((data) => {
    if (data) {
      // Check if account is restricted
      if (data.restricted === true) {
        // Account is restricted, prompt user to contact admin
        return res.status(403).json({ error: "Your account is restricted. Please contact the system administrator." });
      } else {
        // Hash the provided password
        const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('base64');
        
        // Compare hashed password
        if (hashedPassword === data.password) {
          console.log(data);
          return res.status(200).json(data);
        } else {
          // Password incorrect
          return res.status(401).json({ error: "Password incorrect." });
        }
      }
    } else {
      // User ID doesn't exist
      return res.status(404).json({ error: "User doesn't exist." });
    }
  }).catch((error) => {
    // Handle any other errors
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  });
});

router.post("/uploadpayment", uploadpayment.single("paymentReceipt"), (req, res) => {
  // Check if the provided ID already exists in the studentModel
  studentModel.findOne({ id: req.body.id })
    .then((existingStudent) => {
      if (!existingStudent) {
        // ID does not exist, return an error
        return res.status(404).json({ error: "ID does not exist" });
      }

      // Create and save the new payment
      const newPayment = new payment({
        id: req.body.id,
        paymentReceipt: req.file ? req.file.filename : null,
        // Add any other fields related to payment schema here
      });

      newPayment.save()
        .then((savedPayment) => {
          res.status(201).json(savedPayment);
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
// Define route to get payments by student ID
// Endpoint to search payment model by ID
router.get("/payment", (req, res) => {
  const { id } = req.body;

  if (!id) {
      return res.status(400).json({ error: "ID is required in the request body" });
  }

  // Search the payment model by ID
  payment.findOne({ id: id })
      .then((payment) => {
          if (!payment) {
              return res.status(404).json({ error: "Payment not found" });
          }
          res.status(200).json(payment);
      })
      .catch((err) => {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
      });
});
module.exports = router;
