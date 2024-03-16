import React, { useState } from "react";
import { Input, Typography, Checkbox, Button } from "@material-tailwind/react";
import { useAddCourseMutation } from "../../api/course-api";

function AddCourse() {
  const [addCourse] = useAddCourseMutation();
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [creditHour, setCreditHour] = useState(0);

  const handleAddCourse = () => {
    // Call the addCourse mutation with the input values
    addCourse({
      variables: {
        courseId: courseCode,
        name: courseName,
        year: "11",
      },
    });
  };

  return (
    <div className="w-[70%]">
      <form className="mt-8 mb-2 w-full ">
        <div className="flex justify-around">
          <div className="">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Course Code
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-6"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Course Name
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-6"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Credit Hour
            </Typography>
            <Input
              type="number"
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-6"
              value={creditHour}
              onChange={(e) => setCreditHour(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end mr-10">
          <Button color="lightBlue" ripple="light" onClick={handleAddCourse}>
            Add Course
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
