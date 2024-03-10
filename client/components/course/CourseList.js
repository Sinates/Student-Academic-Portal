import { Card, Typography , IconButton,
    Tooltip } from "@material-tailwind/react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";

const TABLE_HEAD = ["Course Code", "Course Name", "Credit Hour", "Action"];

const TABLE_ROWS = [
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
  {
    code: "CS330",
    name: "Data Structure and Algorithm",
    creditHour: "5",
  },
];

export default function CourseList() {
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
          {TABLE_ROWS.map(({ code, name, creditHour }, index) => (
            <tr key={name} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {code}
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
                  {creditHour}
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
