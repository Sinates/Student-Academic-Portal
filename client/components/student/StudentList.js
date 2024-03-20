import { Card, Typography , IconButton,
    Tooltip } from "@material-tailwind/react";
import {students} from "../../data/student";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useGetStudentsQuery } from "@/api/api-slice";

const TABLE_HEAD = ["ID", "Full Name", "Gender", "Email","Phone Number","Department","Actions"];


export default function StudentList() {
  // const {data,isLoading,isError} = useGetStudentsQuery();
  // console.log(data);
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
          {students.map(({id,fullName,gender,email,phoneNumber,department }, index) => (
            <tr key={id} className="even:bg-blue-gray-50/50">
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
                  {fullName}
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
                  {phoneNumber}
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
                  <IconButton variant="text">
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
