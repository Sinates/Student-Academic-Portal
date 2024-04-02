const adminModel = require("../model/admin.model");
const studentModel = require("../model/student.model");
const teacherModel = require("../model/teacher.model");
const batchModel = require("../model/batch.model")
const courseModel = require("../model/course.model")
const CourseStudent = require("../model/courseStudent.model")

const getStudentsByCourseAndBatch = async (req, res) => {

  try {
    const { courseId, batchId } = req.params;

    // Find the batch by ID and populate the courses field
    const batch = await batchModel.findById(batchId).populate("courses");

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Check if the course is associated with the batch
    const isCourseInBatch = batch.courses.some(course => course._id.toString() === courseId);

    if (!isCourseInBatch) {
      return res.status(400).json({ message: "Course is not associated with the batch" });
    }

    // Find students in the batch who are enrolled in the course
    const students = await studentModel.find({
      batch: batchId,
    });

    const response = [];

    for (const student of students) {
      const courseStudent = await CourseStudent.findOne({
      student: student._id,
      course: courseId,
      });

      if (courseStudent) {
      response.push({
        student: student,
        grade: courseStudent.grade,
      });
      } else {
      response.push({
        student: student,
        grade: null,
      });
      }
    }

    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};
const addBatchAndCourseForTeacher = async (req, res) => {
  //teacher's id
  const { id } = req.params;
  const { batchId, courseId } = req.body;

  try {
    const exists = await batchModel.findById(batchId);
    if (!exists) {
      throw Error(" this batch does not exit");
    }
    const exists2 = await courseModel.findById(courseId);
    if (!exists2) {
      throw Error(" this course does not exit");
    }
    exists.courses.push(exists2._id);
    await exists.save();
    const teachers = await teacherModel.findById(id);
    console.log(teachers,id)

    teachers.batch.push(batchId);
    const teachers2 = await teacherModel.findById(id);
    teachers.course.push(courseId);
    // Save the updated teacher object
    await teachers.save();
    await teachers2.save();
    const Teacher = await teacherModel.findById(id);
    res.status(200).json(Teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {getStudentsByCourseAndBatch,addBatchAndCourseForTeacher}

