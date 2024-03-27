const adminModel = require("../model/admin.model");
const studentModel = require("../model/student.model");
const teacherModel = require("../model/teacher.model");
const courseStudent = require("../model/courseStudent.model")

const addGrade = async (req, res) => {
  try {
    const { courseId, studentId, grade } = req.body;
    
    const newGrade = new courseStudent({
      courseId,
      studentId,
      grade,
    });

    await newGrade.save();
    res.status(201).json({ message: "Grade added successfully", data: newGrade });
  } catch (error) {
    res.status(500).json({ message: "Error adding grade", error: error.message });
  }
};

const updateGrade = async (req, res) => {
  try {
    const { id } = req.params;
    const { grade } = req.body;

    const updatedGrade = await courseStudent.findByIdAndUpdate(id, { grade }, { new: true });

    if (!updatedGrade) {
      return res.status(404).json({ message: "Grade not found" });
    }

    res.status(200).json({ message: "Grade updated successfully", data: updatedGrade });
  } catch (error) {
    res.status(500).json({ message: "Error updating grade", error: error.message });
  }
};

const getGradeByCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    const grades = await courseStudent.find({ courseId, studentId }).populate('studentId').populate('courseId');

    res.status(200).json({ data: grades });
  } catch (error) {
    res.status(500).json({ message: "Error fetching grades", error: error.message });
  }
};

const getAllGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await courseStudent.find({ studentId }).populate('studentId').populate('courseId');

    res.status(200).json({ data: grades });
  } catch (error) {
    res.status(500).json({ message: "Error fetching grades", error: error.message });
  }
};

module.exports = { addGrade, updateGrade, getGradeByCourse, getAllGrades };