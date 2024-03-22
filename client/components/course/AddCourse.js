import React, { useState } from "react";
import { Input, Typography, Checkbox, Button } from "@material-tailwind/react";
import { useAddCourseMutation } from "../../api/api-slice";

function AddCourse() {
  const [addCourse] = useAddCourseMutation();
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [creditHour, setCreditHour] = useState();
  const [year, setYear] = useState("");
  const [courseCodeError, setCourseCodeError] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [creditHourError, setCreditHourError] = useState("");
  const [yearError, setYearError] = useState("");

  const handleAddCourse = () => {
    // Check if any input field is empty
    if (!courseCode || !courseName || !year || creditHour === 0) {
      // Display an error message for each empty field
      if (!courseCode) {
        setCourseCodeError("Please enter a course code.");
      } else {
        setCourseCodeError("");
      }
      if (!courseName) {
        setCourseNameError("Please enter a course name.");
      } else {
        setCourseNameError("");
      }
      if (!year) {
        setYearError("Please enter a year.");
      } else {
        setYearError("");
      }
      if (creditHour === 0) {
        setCreditHourError("Please enter a credit hour.");
      } else {
        setCreditHourError("");
      }
      return;
    }
    // Call the addCourse mutation with the input values
    addCourse({
      data: {
        courseId: courseCode,
        name: courseName,
        year: year,
        creditHour: creditHour,
      },
    });
  };

  return (
    <div className="w-[96%] m-auto">
      <form className="mt-8 mb-2 w-full ">
        <div className="flex justify-around">
          <div className="">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Course Code
            </Typography>
            <input
              required
              size="lg"
              className="border border-gray-500 rounded-md focus:border-gray-700 mt-6 h-12 bg-transparent px-2"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
            {courseCodeError && (
              <Typography variant="body2" color="red" className="mt-2">
                {courseCodeError}
              </Typography>
            )}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Course Name
            </Typography>
            <input
              required
              size="lg"
              className="border border-gray-500 rounded-md focus:border-gray-700 mt-6 h-12 bg-transparent px-2"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            {courseNameError && (
              <Typography variant="body2" color="red" className="mt-2">
                {courseNameError}
              </Typography>
            )}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Credit Hour
            </Typography>
            <input
              required
              type="number"
              size="lg"
              className="border border-gray-500 rounded-md focus:border-gray-700 mt-6 h-12 bg-transparent px-2"
              value={creditHour}
              onChange={(e) => setCreditHour(Number(e.target.value))}
            />
            {creditHourError && (
              <Typography variant="body2" color="red" className="mt-2">
                {creditHourError}
              </Typography>
            )}
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Year
            </Typography>
            <input
              required
              type="text"
              size="lg"
              className="border border-gray-500 rounded-md focus:border-gray-700 mt-6 h-12 bg-transparent px-2"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            {yearError && (
              <Typography variant="body2" color="red" className="mt-2">
                {yearError}
              </Typography>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end mr-10">
          <Button
            className="bg-primary"
            ripple="light"
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
