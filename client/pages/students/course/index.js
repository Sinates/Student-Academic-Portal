import {
  Card,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import RootLayout from "@/layouts/RootLayout";
import TopHeader from "@/components/common/Header";

const TABLE_HEAD = [
  "Course Code",
  "Course Name",
  "Credit Hour",
  "Grade",
  "Status",
];

const TABLE_ROWS = [
  {
    code: "CS330",
    name: "Compiler Design",
    creditHour: "5",
    grade: "F",
    status: "Taken",
  },
  {
    code: "CS360",
    name: "Windows Programming",
    creditHour: "5",
    grade: "F",
    status: " Taken",
  },
  {
    code: "CS220",
    name: "Data Structure and Algorithm",
    creditHour: "5",
    grade: "",
    status: "Not Taken",
  },
  {
    code: "CS320",
    name: "Web Design and Development",
    creditHour: "5",
    grade: "",
    status: "Not Taken",
  },
  {
    code: "CS444",
    name: "Programming",
    creditHour: "5",
    grade: "C",
    status: "Taken",
  },
  {
    code: "CS222",
    name: "Object Oriented ",
    creditHour: "5",
    grade: "",
    status: "Not Taken",
  },
  {
    code: "CS242",
    name: "Networking",
    creditHour: "5",
    grade: "D",
    status: " Taken",
  },
  {
    code: "CS420",
    name: "Database Management",
    creditHour: "5",
    grade: "A",
    status: "Taken",
  },
];

export default function Course() {
  return (
    <RootLayout>
      <TopHeader />
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
            {TABLE_ROWS.map(
              ({ code, name, creditHour, grade, status }, index) => (
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
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {grade}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {status}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    </RootLayout>
  );
}
