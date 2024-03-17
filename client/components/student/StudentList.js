import { Card, Typography , IconButton,
    Tooltip } from "@material-tailwind/react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useGetStudentsQuery } from "@/api/api-slice";

const TABLE_HEAD = ["ID", "Full Name", "Gender", "Email","Phone Number","Department","Actions"];

const TABLE_ROWS = [
  {
    id: "CS330",
    fullName: "Jhone Doe",
    gender: "Female",
    email:"jhone@gmail.com",
    phoneNumber:"+251912345657",
    department:"Computer Science"

  },
 
];

export default function StudentList() {
  const {data,isLoading,isError} = useGetStudentsQuery();
  console.log(data);
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
          {TABLE_ROWS.map(({id,fullName,gender,email,phoneNumber,department }, index) => (
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
                <Tooltip content="Edit Course">
                  <IconButton variant="text">
                  <IoPencil />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Delete Course">
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
