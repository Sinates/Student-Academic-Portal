const adminModel = require("../model/admin.model");
const studentModel = require("../model/student.model");
const teacherModel = require("../model/teacher.model");
const Batch = require("../model/batch.model")

const getStudentsByCourseAndBatch = async (req, res) => {
  try {
    const { courseId, batchId } = req.params;

    // Find the batch by ID and populate the courses field
    const batch = await Batch.findById(batchId).populate("courses");

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

    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};

module.exports = {getStudentsByCourseAndBatch}

