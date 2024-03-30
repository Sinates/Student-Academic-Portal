const {
    createCourse,
    getCourse,
    getCourseByTeacherId,
    getBatchByTeacherId,
    getCourseByTeacherIdWithResources
  } = require("../controllers/CourseController");
  
  const express = require("express");
  const router = express.Router();
  router.route("/getCourseByTeacherId/:id").get(getCourseByTeacherId);
  router.route("/getBatchByTeacherId/:id").get(getBatchByTeacherId);
  router.route("/getCourseByTeacherIdWithResources/:id").get(getCourseByTeacherIdWithResources);
  router.route("/createCourse").post(createCourse);
  router.route("/getCourse").post(getCourse);
  
  module.exports = router;
  