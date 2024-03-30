import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Typography,
  IconButton,
  Tooltip
} from "@material-tailwind/react";
import { IoPencil } from "react-icons/io5";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {
  useGetCoursesQuery,
  useDeleteCourseMutation,
  useGetTeachersQuery,
  useGetBatchesQuery,
  useAssignCourseBatchMutation
} from "@/api/api-slice";
import { IoMdAdd } from "react-icons/io";

const TABLE_HEAD = ["Course Code", "Course Name", "Credit Hour", "Year", "Action"];

export default function CourseList() {
  const [isOpen, setIsOpen] = useState(false);
  const [teacher, setTeacher] = useState("");
  const [batch, setBatch] = useState("");
  const [courseId, setCourseId] = useState(""); // New state to store course ID

  const { data: teachers, isLoading: isTeachersLoading, isError: isTeachersError } = useGetTeachersQuery();
  const { data: batchesData, isLoading: isBatchLoading, isError: isBatchError } = useGetBatchesQuery();
  const [assignteacher] = useAssignCourseBatchMutation();
  const { data, isLoading, isError } = useGetCoursesQuery();
  const [deleteCourse] = useDeleteCourseMutation();

  if (isLoading || isTeachersLoading || isBatchLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
      </div>
    );
  }

  if (isError || isTeachersError || isBatchError) {
    return (
      <div className="flex items-center justify-center h-40">
        <div>Error fetching data</div>
      </div>
    );
  }

  const handleOpen = (courseId) => {
    setIsOpen(!isOpen);
    setCourseId(courseId); // Set the course ID when the dialog is opened
  };

  const handleSubmit = async (teacherId, course_Id, batchId) => {
    await assignteacher({ id: teacherId, data: { courseId: course_Id, batchId: batchId } });
    setIsOpen(false); // Close the dialog after submission
  };

  console.log(batchesData)

  return (
    <Card className="h-full overflow-auto mx-8 mt-10">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(({ _id, courseid, courseName, credithour, year }, index) => (
            <tr key={_id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {courseid}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {courseName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {credithour || credit[Math.floor(Math.random() * credit.length)]}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {year}
                </Typography>
              </td>
              <td className="flex">
                <Tooltip content="Delete Course">
                  <IconButton variant="text" onClick={() => deleteCourse({ id: _id })}>
                    <FaTrash />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Assign Course">
                  <IconButton variant="text" onClick={() => handleOpen(_id)}>
                    <IoMdAdd />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={isOpen} handler={handleOpen}>
        <DialogHeader>Assign Teacher and Batch</DialogHeader>
        <DialogBody>
          <form>
            <div>
              <label htmlFor="teacher" className="mr-4 text-md">
                Teacher:
              </label>
              <select
                id="teacher"
                name="teacher"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
              >
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 ">
              <label htmlFor="batch" className="mr-4">
                Batch:
              </label>
              <select
                className="ml-4"
                id="batch"
                name="batch"
                value={batch}
                onChange={(e) => {
                  setBatch(e.target.value);
                  console.log(e.target.value);
                }}
              >
                {batchesData.map((batchValue) => (
                  <option key={batchValue._id} value={batchValue._id}>
                    {batchValue.batchName}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="#4C72A8" onClick={() => handleSubmit(teacher, courseId, batch)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
}
