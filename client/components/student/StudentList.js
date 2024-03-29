import { Card, Typography, IconButton, Tooltip } from "@material-tailwind/react";
// import {students} from "../../data/student";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useGetStudentsQuery } from "@/api/api-slice";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDeleteStudentMutation } from "@/api/api-slice";

const TABLE_HEAD = ["ID", "Full Name", "Gender", "Email", "Phone Number", "Department", "Actions"];

export default function StudentList() {
  const { data, isLoading, isError, isSuccess } = useGetStudentsQuery();
  const [students, setStudents] = useState([]);
  const router = useRouter();
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = (event, studentId) => {
    event.stopPropagation();
    deleteStudent(studentId)
  };

  useEffect(() => {
    if (isSuccess)
      setStudents(data.students);
  }, [data, isSuccess]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
      </div>
    );
  else if (isSuccess){
  if (students?.length === 0)
      return (
        <div className="flex items-center justify-center h-40">
          <div className=" text-blue-gray-900">No students in the system</div>
        </div>
      );
    return (
      <Card className="h-full overflow-auto mx-16 mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-[#E8F1FF] p-4"
                >
                  <Typography
                    variant="h6"
                    color="#334155"
                    className="font-normal text-bold text-[#334155] leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(({_id, id, name, gender, email, phone, department }, index) => (
              <tr onClick={() => router.push(`/admin/student/${_id}`)} key={id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {id}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {gender}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {phone}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {department}
                  </Typography>
                </td>
                <td className="flex">
                  <Tooltip content="Delete Student">
                    <IconButton variant="text" onClick={(e)=>handleDelete(e,_id)} >
                      <FaTrash />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    );
            }
  else
    return (<div>Error Loading Students. Try Again.</div>);
}
