import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card, Typography, IconButton,
  Tooltip
} from "@material-tailwind/react";
import { IoPencil } from "react-icons/io5";
import { useState } from "react";

import { FaTrash } from "react-icons/fa";
import { useGetCoursesQuery, useDeleteCourseMutation,useGetTeachersQuery } from "@/api/api-slice";

import { IoMdAdd } from "react-icons/io";


const TABLE_HEAD = ["Course Code", "Course Name", "Credit Hour", "Year", "Action"];


export default function CourseList() {
  const [isOpen, setIsOpen] = useState(false);

 const {data:teachers, isTeachersLoading,isTeachersError} = useGetTeachersQuery();
 console.log(teachers)
  const handleOpen = () => setIsOpen(!isOpen);
  const credit = [3, 4, 5];
  const { data, isLoading, isError } = useGetCoursesQuery();

  const [deleteCourse] = useDeleteCourseMutation();
  if (isLoading || isTeachersLoading) {
    return <div>Loading...</div>;
  }

  if (isError || isTeachersError) {
    return <div>Error fetching data</div>;
  }
  return (
    <Card className="h-full  overflow-auto mx-8 mt-10">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
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
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {courseid}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {courseName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {credithour || credit[Math.floor(Math.random() * credit.length)]}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
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
                  <IconButton variant="text" onClick={() => handleOpen()}>
                    <IoMdAdd />
                  </IconButton>

                </Tooltip>
              </td>
            </tr>
          ))}

          <Dialog open={isOpen} handler={handleOpen}>
            <DialogHeader>Assign Teacher and Batch</DialogHeader>
            <DialogBody>
              <form>
                <div>
                  <label htmlFor="teacher">Teacher:</label>
                  <select id="teacher" name="teacher">
                    <option value="teacher1">{teachers.email}</option>
                    <option value="teacher2">Teacher 2</option>
                    <option value="teacher3">Teacher 3</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="batch">Batch:</label>
                  <select id="batch" name="batch">
                    <option value="batch1">Batch 1</option>
                    <option value="batch2">Batch 2</option>
                    <option value="batch3">Batch 3</option>
                  </select>
                </div>
              </form>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" color="#4C72A8" onClick={handleOpen}>
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </Dialog>
        </tbody>
      </table>
    </Card>
  );
}
