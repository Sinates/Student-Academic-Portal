const course = require("../Models/Course");
const resource = require("../Models/Resource");
//create course

const createResource = async (req, res) => {
  const { id } = req.params;
  const image1 = req.file;
  const resourceName = image1.filename;
  try {
    const Course = await course.findById(id);
    //finding batch Id for each courses by the given batch name(unique)
    if (!Course) {
      throw Error("Course does not exist ");
    }

    const course_Id = Course._id;
    const resources = await resource.create({
      resourceName,
      course_Id,
    });
    res.status(200).json(resources);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteResource = async (req, res) => {
  const { id } = req.params;
  const resources = await resource.findOneAndDelete({ _id: id });
  res.status(200).json(resources);
};
const getResource = async (req, res) => {
  const { id } = req.params;

  const Course = await course.findById(id);
  const course_Id = Course._id;
  const resources = await resource.findById(course_Id);
  res.status(200).json(resources);
};
module.exports = {
  createResource,
  getResource,
  deleteResource,
};
