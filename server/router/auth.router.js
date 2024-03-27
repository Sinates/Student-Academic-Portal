const adminModel = require("../model/admin.model");
const studentModel = require("../model/student.model");
const teacherModel = require("../model/teacher.model");
const express = require("express");

const router = express.Router();
const crypto = require("crypto");
router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    studentModel.findOne({ email }).then((studentData) => {
        if (studentData) {
            // Check if student account is restricted
            if (studentData.restricted === true) {
                return res.status(403).json({
                    error:
                        "Your account is restricted. Please contact the system administrator.",
                });
            } else {
                // Hash the provided password
                const hashedPassword = crypto
                    .createHash("sha256")
                    .update(password)
                    .digest("base64");

                // Compare hashed password
                if (hashedPassword === studentData.password) {
                    console.log(studentData);
                    return res.status(200).json({status:201,data:studentData});
                } else {
                    // Password incorrect
                    return res.status(401).json({ error: "Password or email is incorrect." });
                }
            }
        } else {
            // Student not found, check teacher collection
            teacherModel.findOne({ email }).then((teacherData) => {
                if (teacherData) {
                    // Check if teacher account is restricted
                    if (teacherData.restricted === true) {
                        return res.status(403).json({
                            error:
                                "Your account is restricted. Please contact the system administrator.",
                        });
                    } else {
                        // Hash the provided password
                        const hashedPassword = crypto
                            .createHash("sha256")
                            .update(password)
                            .digest("base64");

                        // Compare hashed password
                        if (hashedPassword === teacherData.password) {
                            console.log(teacherData);
                            return res.status(200).json({status:201,data:teacherData});
                        } else {
                            // Password incorrect
                            return res.status(401).json({ error: "Password or email is incorrect." });
                        }
                    }
                } else {
                    // Teacher not found, check admin collection
                    adminModel.findOne({ email }).then((adminData) => {
                        if (adminData) {
                            // Check if admin account is restricted
                            if (adminData.restricted === true) {
                                return res.status(403).json({
                                    error:
                                        "Your account is restricted. Please contact the system administrator.",
                                });
                            } else {
                                // Hash the provided password
                                const hashedPassword = crypto
                                    .createHash("sha256")
                                    .update(password)
                                    .digest("base64");

                                // Compare hashed password
                                if (hashedPassword === adminData.password) {
                                    console.log(adminData);
                                    return res.status(200).json({status:201,data:adminData});
                                } else {
                                    // Password incorrect
                                    return res.status(401).json({ error: "Password or email is incorrect." });
                                }
                            }
                        } else {
                            // User not found in any collection
                            return res.status(404).json({ error: "User doesn't exist." });
                        }
                    });
                }
            });
        }
    }).catch((error) => {
        // Handle any other errors
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    });
});

router.post("/signup", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = crypto
            .createHash("sha256")
            .update(password)
            .digest("base64");

        // Check if email exists in student collection
        const studentData = await studentModel.findOne({ email });
        if (studentData) {
            // Check if student account is restricted
            if (studentData.restricted === true) {
                return res.status(403).json({
                    error:
                        "Your account is restricted. Please contact the system administrator.",
                });
            } else {
                // Update student password
                await studentModel.findOneAndUpdate(
                    { email },
                    { password: hashedPassword }
                );
                return res.status(201).json({
                    status:201,
                    message: "User Signup completed",
                    data: studentData
                });
            }
        }

        // Check if email exists in teacher collection
        const teacherData = await teacherModel.findOne({ email });
        if (teacherData) {
            // Check if teacher account is restricted
            if (teacherData.restricted === true) {
                return res.status(403).json({
                    error:
                        "Your account is restricted. Please contact the system administrator.",
                });
            } else {
                // Update teacher password
                await teacherModel.findOneAndUpdate(
                    { email },
                    { password: hashedPassword }
                );
                return res.status(201).json({
                    status:201,
                    message: "User Signup completed",
                    role: "Teacher",
                    documentId: teacherData._id,
                    email: teacherData.email
                });
            }
        }

        // Check if email exists in admin collection
        const adminData = await adminModel.findOne({ email });
        if (adminData) {
            // Check if admin account is restricted
            if (adminData.restricted === true) {
                return res.status(403).json({
                    error:
                        "Your account is restricted. Please contact the system administrator.",
                });
            } else {
                // Update admin password
                await adminModel.findOneAndUpdate(
                    { email },
                    { password: hashedPassword }
                );
                return res.status(201).json({
                    status:201,
                    message: "User Signup completed",
                    role: "Admin",
                    documentId: adminData._id,
                    email: adminData.email
                });
            }
        }

        // Email not found in any collection
        return res.status(403).json({
            error: "User has not been pre-registered yet.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;