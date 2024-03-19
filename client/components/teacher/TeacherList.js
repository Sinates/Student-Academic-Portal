import {
  Card,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";
import { useGetTeachersQuery } from "../../api/api-slice";

const TABLE_HEAD = [
  "ID",
  "Full Name",
  "Gender",
  "Email",
  "Phone Number",
  "Actions",
];

export default function TeacherList() {
  const { data, isLoading, isError ,isSuccess} = useGetTeachersQuery();
  return (
    <Card className="h-full  overflow-auto mx-8 mt-10">
      {isLoading && (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
        </div>
      )}

      {isError && (
        <Typography variant="body" color="red" className="text-center mt-4">
          Error loading teachers. Please try again later.
        </Typography>
      )}
      {isSuccess && (
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
            {data.map(
              (
                { id, name, gender, email, phone },
                index
              ) => (
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
                      {name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {gender == "M"?"Male":"Female"}
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

                  <td cl>
                    <Tooltip content="Delete Course">
                      <IconButton className="px-auto" variant="text">
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </Card>
  );
}
