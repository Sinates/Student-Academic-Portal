const course = require("../model/course.model");
const batch = require("../model/batch.model");
const teacher = require("../model/teacher.model");
const resource = require("../model/Resource");
//create course

const createCourse = async (req, res) => {
  try {
    // Extract course name and courseId from request body
    const { name, courseId, year, creditHour } = req.body;

    // Check if the courseId already exists
    const existingCourse = await course.findOne({ courseId });

    // If courseId already exists, return an error
    if (existingCourse) {
      return res.status(400).json({ error: "Course ID already exists" });
    }

    // Create a new course instance
    const newCourse = new course({
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
};
const getCourse = async (req, res) => {
  const { batchName } = req.body;

  const Batch = await batch.findOne({ batchName });
  const batch_Id = Batch._id;
  const courses = await course.findById(batch_Id);
  res.status(200).json(courses);
};
//get courses by teacher id

const getCourseByTeacherId = async (req, res) => {
  //teacher id
  let MyCourses = [];
  //teacher id
  const { id } = req.params;
  const response = await teacher.findById(id);
  const Courses = response.course;
 
  for (course1 of Courses) {
    const newcourse = await course.findById(course1);
    console.log(newcourse)
    MyCourses.push(newcourse);

  }
  res.status(200).json(MyCourses); //Courses are Arrray
}

//get courses by teacher id with resources

const getCourseByTeacherIdWithResources = async (req, res) => {
  let MyCourses = []
  //teacher id
  const { id } = req.params;
  const response = await teacher.findById(id)
  const Courses = response.course;
  for (course of Courses) {
    const newCourse = await course.findById(course);
    MyCourses.push(newCourse);

  }


  const materials = await resource.find({});
  const coursesWithMaterials = MyCourses.map((course) => {
    const relatedMaterials = materials.filter(
      (material) => material.course_Id.toString() === course._id.toString()
    );

    return {
      id: course._id,
      name: course.courseName,
      materials: relatedMaterials,
    };
  });

  res.status(200).json(coursesWithMaterials);
}

//get batches by teacher id

const getBatchByTeacherId = async (req, res) => {
  //teacher id
  let myBatches = [];
  const { id } = req.params;
  const response = await teacher.findById(id)
  const batches = response.batch;

  for (batch1 of batches) {
    const newBatch = await batch.findById(batch1);
    myBatches.push(newBatch);

  }
  res.status(200).json(myBatches);
}


module.exports = {
  createCourse,
  getCourse,
  getCourseByTeacherId,
  getBatchByTeacherId,
  getCourseByTeacherIdWithResources
};
