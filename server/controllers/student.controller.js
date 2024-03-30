const student = require("../model/student.model");
const courseStudent = require("../model/courseStudent.model");
const course = require("../model/course.model");
const GradeChangeRequest = require("../model/gradeChangeRequest.model");

//   // Example usage
//   const id = generateID();
//   console.log(id);
const register = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ error: "Mission Value" });
    } else {
      await student.create(newStudent);
      res.status(200).json({ message: "Student Registered" }).end();
    }
  } catch (error) {
    console.log(error);
  }
};

const createGradeChangeRequest = async (req, res) => {
  try {
    const { teacherId, studentId, courseId, typeOfAssessment, optionalNote } = req.body;
    console.log(req.body)
    // Check if optionalNote is provided in the request body
    const newGradeChangeRequestData = {
      teacher: teacherId,
      student: studentId,
      course: courseId,
      typeOfAssessment,
      isApproved: false, // Set default value to false
    };

    if (optionalNote !== undefined && optionalNote !== null) {
      newGradeChangeRequestData.optionalNote = optionalNote;
    }

    const newGradeChangeRequest = new GradeChangeRequest(newGradeChangeRequestData);
    await newGradeChangeRequest.save();

    res.status(201).json({ message: "Grade change request created successfully", data: newGradeChangeRequest });
  } catch (error) {
    res.status(500).json({ message: "Error creating grade change request", error: error.message });
  }
};
const getStudentCourses = async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Find all the courseStudent records for the given studentId
    const courseStudents = await courseStudent.find({ studentId: studentId });

    // Extract the courseId and grade from each courseStudent record
    const courseInfoPromises = courseStudents.map(async (courseStudent) => {
      const courseId = courseStudent.courseId;
      const grade = courseStudent.grade;

      // Fetch the course details using courseId
      const courseDetails = await course.findOne({ _id: courseId });

      return {
        course: courseDetails,
        grade: grade
      };
    });

    // Resolve all promises to get the course information with grades
    const courseInfo = await Promise.all(courseInfoPromises);

    res.status(200).json({ courses: courseInfo });
  } catch (error) {
    res.status(500).json({ message: "Error fetching student courses", error: error.message });
  }
};



module.exports = {register, createGradeChangeRequest,getStudentCourses}
