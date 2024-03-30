const express = require("express");
const path = require("path");
const fs = require("fs");

const Admin = require("../model/admin.model");
const studentModel = require("../model/student.model");
const payment = require("../model/payment.model");
const courseModel = require("../model/course.model");
const adminModel = require("../model/admin.model");
const router = express.Router();
const ExcelJS = require("exceljs");
const crypto = require("crypto");
const teacherModel = require("../model/teacher.model");
const {getStudentsByCourseAndBatch,addBatchAndCourseForTeacher} = require("../controllers/admin.controller")

router.post("/verifypayment", (req, res) => {
  const studentId = req.body.id;
})

router.post("/verifypayment/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)

  payment
    .findOne({ _id: id })
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
        .then(async () => {
          const student = await studentModel.findOne({ id: paymentEntry.id });
          if (!student) {
            // Student not found
            return res.status(404).json({ error: "Student not found" });
          }

          // Send email to the student
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.email,
              pass: process.env.pass,
            },
          });
      
          const mailOptions = {
            from: '"Hilcoe School of CS & Tech" <your_email@gmail.com>', // Sender address
            to: student.email, // Student's email address
            subject: "Payment Acceptance", // Email subject
            text: `Dear ${student.name},\n\n Your payment reciept has been verified`, // Plain text body
            html: `
              <p><img src="https://hilcoe.net/wp-content/uploads/2022/03/logo-hilcoe.jpg" alt="Sample School Logo" width="100"></p>
              <p>Your payment for the semester has been successfully verfied. Please contact the school registrar if you have any questions!</p>
              <p>Best regards,<br>Hilcoe School Registrar Office</p>
            `, // HTML body
          };
      
          // Send email and schedule rejection email after 10 days
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              return res.status(500).json({ error: "Internal server error" });
            } else {
              console.log("Email sent:", info.response);
            }  
          });
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
router.post("/declinePayment/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id)

  payment.findOne({ _id: id })
    .then((paymentEntry) => {
      if (!paymentEntry) {
        return res.status(404).json({ error: "Payment not found" });
      }
      const studentId = paymentEntry.id;
      // Delete the payment entry
      paymentEntry.deleteOne()
        .then(() => {
          res.status(200).json({ message: "Payment deleted successfully" });
        })
        .catch((err) => {
          console.error("Error deleting payment:", err);
          res.status(500).json({ error: "Internal server error" });
        });

      // Fetch student details
      studentModel.findOne({ id: studentId })
        .then((student) => {
          if (!student) {
            console.error("Student not found");
            return res.status(500).json({ error: "Internal server error" });
          }

          // Send email to student
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.email,
              pass: process.env.pass,
            },
          });

          const mailOptions = {
            from: '"Hilcoe School of CS & Tech" <your_email@gmail.com>', // Sender address
            to: student.email, // Student's email address
            subject: "Payment rejection", // Email subject
            text: `Dear ${student.name},\n\n Your payment receipt has been rejected`, // Plain text body
            html: `
              <p><img src="https://hilcoe.net/wp-content/uploads/2022/03/logo-hilcoe.jpg" alt="Sample School Logo" width="100"></p>
              <p>Please contact the school registrar to resolve this issue!</p>
              <p>Best regards,<br>Hilcoe School Registrar Office</p>
            `, // HTML body
          };

          // Send email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
              return res.status(500).json({ error: "Internal server error" });
            } else {
              console.log("Email sent:", info.response,student.email,);
            }
          });
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
const nodemailer = require("nodemailer");
const paymentModel = require("../model/payment.model");

router.post("/verifystudent", async (req, res) => {
  try {
    const studentId = req.body.id;

    // Find the student by ID
    const student = await studentModel.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Check if the student is already verified
    if (!student.restricted) {
      return res.status(200).json({ message: "Student is already verified" });
    }

    // Update the student's verification status
    student.restricted = false;
    await student.save();

    // Send congratulatory email with student's ID
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: '"Hilcoe School of CS & Tech" <your_email@gmail.com>', // Sender address
      to: student.email, // Student's email address
      subject: "Congratulations on Your Acceptance to Hilcoe School!", // Email subject
      text: `Dear ${student.name},\n\nCongratulations! We are pleased to inform you that you have been accepted to Hilcoe School of Computer Science & Technology. Your student ID is ${student.id}. To complete your registration, please proceed to the signup page using the following link:\n\nhttps://hilcoe-school.com/signup?id=${student.id}\n\nOnce signed up, you will be able to assign a password and access your dashboard.\n\nBest regards,\nHilcoe School Admissions Team`, // Plain text body
      html: `
        <p><img src="https://hilcoe.net/wp-content/uploads/2022/03/logo-hilcoe.jpg" alt="Sample School Logo" width="100"></p>
        <h2>Congratulations ${student.name}!</h2>
        <p>We are pleased to inform you that you have been accepted to Hilcoe School of Computer Science & Technology. Your student ID is <strong>${student.id}</strong>. Now got to the Signup page and set your password and access your dashboard. Welcome aboard!</p>
        <p>Best regards,<br>Hilcoe School Admissions Team</p>
      `, // HTML body
    };

    // Send email and schedule rejection email after 10 days
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Internal server error" });
      } else {
        console.log("Email sent:", info.response);

        // Schedule rejection email after 10 days
        setTimeout(
          () => {
            const rejectionMailOptions = {
              from: '"Hilcoe School of CS & Tech" <your_email@gmail.com>', // Sender address
              to: student.email, // Student's email address
              subject: "Application Status Update", // Email subject
              text: `Dear ${student.name},\n\nWe regret to inform you that your application to Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest and wish you the best in your future endeavors.\n\nBest regards,\nHilcoe School Admissions Team`, // Plain text body
              html: `
              <p><img src="https://hilcoe.net/wp-content/uploads/2022/03/logo-hilcoe.jpg" alt="Sample School Logo" width="100"></p>
              <h2>Application Status Update</h2>
              <p>We regret to inform you that your application to Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest and wish you the best in your future endeavors.</p>
              <p>Best regards,<br>Hilcoe School Admissions Team</p>
            `, // HTML body
            };
            transporter.sendMail(rejectionMailOptions, (error, info) => {
              if (error) {
                console.error("Error sending rejection email:", error);
              } else {
                console.log("Rejection email sent:", info.response);
              }
            });
          },
          10 * 24 * 60 * 60 * 1000
        ); // 10 days in milliseconds

        return res.status(200).json({
          message: "Student sign-up verified successfully and email sent",
        });
      }
    });
  } catch (error) {
    console.error("Error verifying student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
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
    const { name, courseId, year, creditHour } = req.body;

    // Check if the courseId already exists
    const existingCourse = await courseModel.findOne({ courseId });

    // If courseId already exists, return an error
    if (existingCourse) {
      return res.status(400).json({ error: "Course ID already exists" });
    }

    // Create a new course instance
    const newCourse = new courseModel({
      courseName: name,
      courseid: req.body.courseId,
      year: year,
      credithour: creditHour,
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
// Route to delete a course
router.delete("/courses/:_id", async (req, res) => {
  try {
    const _id = req.params._id;

    // Find the course by courseId
    const course = await courseModel.findOne({ _id });

    // If the course doesn't exist, return an error
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Delete the course from the database
    await courseModel.deleteOne({ _id });

    // Return success message
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Endpoint to get a student by ID
router.get("/students/:id", (req, res) => {
  const studentId = req.params.id;

  // Check if the studentId is undefined or empty
  if (studentId === "1" ) {
    return res.status(400).json({ error: "Invalid student ID" });
  }
  console.log("student", studentId);
  // Find the student by ID
  studentModel
    .findOne({ _id: studentId })
    .then((student) => {
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }
      res.status(200).json(student);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});
// Endpoint to fetch a teacher by ID
router.get("/teachers/:id", (req, res) => {
  const teacherId = req.params.id;
  // Find the teacher by ID
  teacherModel
    .findOne({ _id: teacherId })
    .then((teacher) => {
      if (!teacher) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      res.status(200).json(teacher);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

router.post("/restrictstudent", (req, res) => {
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
      student.restricted = true;
      student
        .save()
        .then(() => {
          res.status(200).json({ message: "Student banned successfully" });
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
router.get("/getstudents", async (req, res) => {
  const { batch } = req.body;

  try {
    const studentsInBatch = await studentModel.find({ batch: batch });
    res.status(200).json({ students: studentsInBatch });
  } catch (error) {
    console.error(`Error retrieving students in batch ${batch}:`, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signin", (req, res) => {
  adminModel
    .findOne({
      email: req.body.email,
    })
    .then((data) => {
      if (data) {
        // Hash the provided password
        const hashedPassword = crypto
          .createHash("sha256")
          .update(req.body.password)
          .digest("base64");

        // Compare hashed password
        if (hashedPassword === data.password) {
          console.log(data);
          return res.status(200).json(data);
        } else {
          // Password incorrect
          return res.status(401).json({ error: "Password incorrect." });
        }
      } else {
        // User ID doesn't exist
        return res.status(404).json({ error: "User doesn't exist." });
      }
    })
    .catch((error) => {
      // Handle any other errors
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    });
});
router.post("/signup", (req, res) => {
  const { email, password } = req.body;

  // Check if the email already exists
  adminModel
    .findOne({ email })
    .then((existingAdmin) => {
      if (existingAdmin) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash the provided password
      const hashedPassword = crypto
        .createHash("sha256")
        .update(password)
        .digest("base64");

      // Create a new admin
      const newAdmin = new adminModel({
        email,
        password: hashedPassword,
        role: "Admin",
      });

      // Save the new admin to the database
      newAdmin
        .save()
        .then((savedAdmin) => {
          console.log("New admin created:", savedAdmin);
          res.status(201).json({ message: "Admin created successfully" });
        })
        .catch((error) => {
          console.error("Error saving admin:", error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    })
    .catch((error) => {
      console.error("Error checking for existing admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
router.post("/verifyteacher/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Find the teacher by email
    const teacher = await teacherModel.findOne({ _id: teacherId });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Update the teacher's verification status based on acceptance
    teacher.restricted = false;
    await teacher.save();

    // Create transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
      tls: {
        rejectUnauthorized: false, // Bypass SSL certificate verification
      },
    });

    // Configure email options based on acceptance status
    const mailOptions = {
      from: '"Hilcoe School of CS & Tech" <your_email@gmail.com>',
      to: teacher.email,
      subject: !teacher.restricted
        ? "Congratulations! You've been accepted as a teacher"
        : "Regarding your application as a teacher",
      text: !teacher.restricted
        ? `Dear ${teacher.name},\n\nCongratulations! We are pleased to inform you that you have been accepted as a teacher at Hilcoe School of Computer Science & Technology. Welcome to the team!\n\nBest regards,\nHilcoe School Admissions Team`
        : `Dear ${teacher.name},\n\nWe regret to inform you that your application as a teacher at Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest in our institution.\n\nBest regards,\nHilcoe School Admissions Team`,
      html: !teacher.restricted
        ? `
          <p>Dear ${teacher.name},</p>
          <p>Congratulations! We are pleased to inform you that you have been accepted as a teacher at Hilcoe School of Computer Science & Technology. Welcome to the team!</p>
          <p>Best regards,<br>Hilcoe School Admissions Team</p>
        `
        : `
          <p>Dear ${teacher.name},</p>
          <p>We regret to inform you that your application as a teacher at Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest in our institution.</p>
          <p>Best regards,<br>Hilcoe School Admissions Team</p>
        `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(
      `${!teacher.restricted ? "Acceptance" : "Rejection"} email sent to teacher:`,
      teacher.email
    );

    // Send response
    return res.status(200).json({
      message: `Teacher ${!teacher.restricted ? "accepted" : "rejected"} successfully`,
    });
  } catch (error) {
    console.error("Error verifying teacher:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// Function to fetch student data based on batch
async function getStudentsByBatch(batch) {
  try {
    const students = await studentModel.find({ batch: batch }).lean(); // Assuming batch is a field in your student model
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
}

// Function to generate Excel file
async function generateExcel(batch) {
  const students = await getStudentsByBatch(batch);

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Students");

  // Define headers
  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Name", key: "name", width: 20 },
    { header: "Mid", key: "mid", width: 10 },
    { header: "Final", key: "final", width: 10 },
    { header: "Assessment", key: "assessment", width: 15 },
    { header: "Total", key: "total", width: 10 },
    { header: "Grade", key: "grade", width: 10 },
  ];

  // Populate data
  students.forEach((student) => {
    worksheet.addRow({
      id: student.id.toString(), // Assuming ID is stored as _id in MongoDB
      name: student.name,
      mid: student.mid || "", // Handle cases where the values might be null or undefined
      final: student.final || "",
      assessment: student.assessment || "",
      total: student.total || "",
      grade: student.grade || "",
    });
  });

  // Save the workbook
  const folderPath = path.join(__dirname, "../uploads/generate");
  const fileName = `students_batch_${batch}.xlsx`;
  const filePath = path.join(folderPath, fileName);
  await workbook.xlsx.writeFile(filePath);
  console.log(`Excel file "${fileName}" generated successfully.`);
  return filePath;
}

// Route to generate Excel file using POST request
router.post("/generateExcel", async (req, res) => {
  const batch = req.body.batch;
  if (!batch) {
    return res.status(400).json({ error: "Batch parameter is required" });
  }

  try {
    const fileName = await generateExcel(batch);
    res.download(fileName);
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route to assign courses to a teacher
router.post("/assignCourses", async (req, res) => {
  try {
    const { email, course, batch } = req.body;

    // Check if the provided teacher email exists
    const existingTeacher = await teacherModel.findOne({ email });
    if (!existingTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Update the assigned courses for the teacher
    existingTeacher.assignedCourses.push(course);
    existingTeacher.batch.push(batch); // Push new courses to the existing array
    // Push new courses to the existing array
    await existingTeacher.save();

    return res.status(200).json({ message: "Courses assigned successfully" });
  } catch (error) {
    console.error("Error assigning courses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
// router.get("/getteachers", async (req, res) => {
//   try {
//     const teachers = await teacherModel.find({}, { _id: 0, name: 1 });
//     return res.status(200).json(teachers.map(teacher => teacher.name));
//   } catch (error) {
//     console.error("Error fetching teachers:", error);
//     return res.status(500).json({ error: "Internal server error." });
//   }
// });
router.get("/getteachers", async (req, res) => {
  try {
    const teachers = await teacherModel.find({});
    return res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/sendnotifications", async (req, res) => {
  try {
    const { sender, message } = req.body;

    // Find all students
    const students = await studentModel.find({});

    if (!students || students.length === 0) {
      return res.status(404).json({ error: "No students found." });
    }

    // Add the notification to each student's notifications array
    for (const student of students) {
      student.notifications.push({ sender, message, time: Date.now() });
      await student.save();
    }

    return res
      .status(200)
      .json({ message: "Notifications sent successfully." });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});
router.get("/courselist", async (req, res) => {
  try {
    // Query the database to find all courses
    const courses = await courseModel.find({}, {});

    // Return the retrieved courses as the response
    res.status(200).json(courses);
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error retrieving courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getpayments", async (req, res) => {
  try {
    // Fetch all payments from the PaymentModel
    const payments = await paymentModel.find(
      {verified: false},
      { id: 1, paymentReceipt: 1, verified: 1, _id: 1 }
    );

    // Map over the payments to retrieve student names
    const paymentsWithNames = await Promise.all(
      payments.map(async (payment) => {
        // Fetch student details using the student ID from the payment
        const student = await studentModel.findOne({ id: payment.id });
        if (student) {
          // If student found, add their name to the payment object
          return { ...payment.toObject(), studentName: student.name };
        } else{
          return { ...payment.toObject(), studentName: "unknown" };
        }
      })
    );

    // Return the payments with student names
    res.status(200).json(paymentsWithNames);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
async function generateAttendanceExcel(batch) {
  // Fetch students in the specified batch
  const students = await studentModel.find({ batch });

  // Fetch attendance records for the specified batch
  const attendanceRecords = await attendanceModel.find({ batch });

  // Create a new workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Attendance");

  // Add headers to the worksheet
  worksheet.columns = [
    { header: "Student Name", key: "name", width: 20 },
    { header: "Student ID", key: "id", width: 15 },
    { header: "Attendance", key: "attendance", width: 15 },
  ];

  // Add data rows for each student
  students.forEach((student) => {
    const attendanceRecord = attendanceRecords.find(
      (record) => record.studentId === student.id
    );
    const attendanceStatus = attendanceRecord
      ? attendanceRecord.attendance
      : "Absent";
    worksheet.addRow({
      name: student.name,
      id: student.id,
      attendance: attendanceStatus,
    });
  });

  // Generate a unique filename for the Excel file
  const fileName = `attendance_${batch}_${Date.now()}.xlsx`;

  // Save the workbook to a file
  await workbook.xlsx.writeFile(fileName);

  return fileName;
}
router.post("/generateAttendanceExcel", async (req, res) => {
  const { batch } = req.body;
  if (!batch) {
    return res.status(400).json({ error: "Batch parameter is required" });
  }

  try {
    // Fetch students in the specified batch
    const students = await studentModel.find({ batch });

    // Fetch attendance records for the specified batch
    const attendanceRecords = await studentModel.find({ batch });

    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    // Add headers to the worksheet
    worksheet.columns = [
      { header: "Student Name", key: "name", width: 20 },
      { header: "Student ID", key: "id", width: 15 },
      { header: "Attendance", key: "attendance", width: 15 },
    ];

    // Add data rows for each student
    students.forEach((student) => {
      const attendanceRecord = attendanceRecords.find(
        (record) => record.studentId === student.id
      );
      const attendanceStatus = attendanceRecord
        ? attendanceRecord.attendance
        : "";
      worksheet.addRow({
        name: student.name,
        id: student.id,
        attendance: attendanceStatus,
      });
    });

    // Generate a unique filename for the Excel file
    const fileName = `attendance_${batch}_${Date.now()}.xlsx`;

    // Save the workbook to a file
    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      "attendance",
      fileName
    );
    await workbook.xlsx.writeFile(filePath);

    // Send the generated Excel file as a download
    res.download(filePath);
  } catch (error) {
    console.error("Error generating attendance Excel file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/pendingapproval", async (req, res) => {
  try {
    // Find all students where restricted is true
    const pendingStudents = await studentModel.find({ restricted: true });

    // If no students are found with restricted true, return 404 error

    // Return the list of pending students
    res.status(200).json(pendingStudents);
  } catch (error) {
    console.error("Error retrieving pendin  g students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/pendingapprovalTeacher", async (req, res) => {
  try {
    // Find all students where restricted is true
    const pendingTeacher = await teacherModel.find({ restricted: true });

    // If no students are found with restricted true, return 404 error

    // Return the list of pending students
    res.status(200).json(pendingTeacher);
  } catch (error) {
    console.error("Error retrieving pendin  g students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/rejectteacher/:id", async (req, res) => {
  try {
    const teacherId = req.params.id;


    const teacher = await teacherModel.findOne({ _id: teacherId });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Send rejection email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: '"Hilcoe School of CS & Tech" <your_email@gmail.com>', // Sender address
      to: teacher.email, // Teacher's email address
      subject: "Application Status Update", // Email subject
      text: `Dear ${teacher.name},\n\nWe regret to inform you that your application to Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest and wish you the best in your future endeavors.\n\nBest regards,\nHilcoe School Admissions Team`, // Plain text body
      html: `
        <p><img src="https://hilcoe.net/wp-content/uploads/2022/03/logo-hilcoe.jpg" alt="Sample School Logo" width="100"></p>
        <h2>Application Status Update</h2>
        <p>We regret to inform you that your application to Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest and wish you the best in your future endeavors.</p>
        <p>Best regards,<br>Hilcoe School Admissions Team</p>
      `, // HTML body
    };

    // Send rejection email
    await transporter.sendMail(mailOptions);

    // Delete the teacher document
    await teacherModel.deleteOne({ _id: teacher._id });

    return res.status(200).json({
      message:
        "Teacher rejection email sent successfully and teacher document deleted",
    });
  } catch (error) {
    console.error("Error rejecting teacher:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/rejectstudent", async (req, res) => {
  try {
    const { id } = req.body;

    // Find the teacher by email
    const student = await studentModel.findOne({ id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Send rejection email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.email,
        pass: process.env.pass,
      },
    });

    const mailOptions = {
      from: '"Hilcoe School of CS & Tech" <your_email@gmail.com>', // Sender address
      to: student.email, // Teacher's email address
      subject: "Application Status Update", // Email subject
      text: `Dear ${student.name},\n\nWe regret to inform you that your application to Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest and wish you the best in your future endeavors.\n\nBest regards,\nHilcoe School Admissions Team`, // Plain text body
      html: `
        <p><img src="https://hilcoe.net/wp-content/uploads/2022/03/logo-hilcoe.jpg" alt="Sample School Logo" width="100"></p>
        <h2>Application Status Update</h2>
        <p>We regret to inform you that your application to Hilcoe School of Computer Science & Technology has been rejected. We appreciate your interest and wish you the best in your future endeavors.</p>
        <p>Best regards,<br>Hilcoe School Admissions Team</p>
      `, // HTML body
    };

    // Send rejection email
    await transporter.sendMail(mailOptions);

    // Delete the teacher document
    await studentModel.deleteOne({ _id: student._id });

    return res.status(200).json({
      message:
        "Student rejection email sent successfully and teacher document deleted",
    });
  } catch (error) {
    console.error("Error rejecting teacher:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/courses", async (req, res) => {
  try {
    const courseId = req.body.courseid;

    // Delete the course from the database
    const result = await courseModel.deleteOne({ courseid: courseId });

    // Check if the course was deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Return a success message
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error deleting course:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/teachers/:_id", async (req, res) => {
  try {
    const _id = req.params._id;

    // Find the course by courseId
    const course = await teacherModel.findOne({ _id });

    // If the course doesn't exist, return an error
    if (!course) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Delete the course from the database
    await teacherModel.deleteOne({ _id });

    // Return success message
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.delete("/students/:_id", async (req, res) => {
  try {
    const _id = req.params._id;

    // Find the course by courseId
    const course = await studentModel.findOne({ _id });

    // If the course doesn't exist, return an error
    if (!course) {
      return res.status(404).json({ error: "Student not found" });
    }

    // Delete the course from the database
    await studentModel.deleteOne({ _id });

    // Return success message
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/students/course/:courseId/:batchId",getStudentsByCourseAndBatch)
router.put("/assignCourseBatch/:id",addBatchAndCourseForTeacher)

module.exports = router;
