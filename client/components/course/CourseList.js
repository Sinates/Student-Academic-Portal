import { Card, Typography , IconButton,
    Tooltip } from "@material-tailwind/react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { useGetCoursesQuery ,useDeleteCourseMutation} from "@/api/api-slice";

const TABLE_HEAD = ["Course Code", "Course Name", "Credit Hour","Year", "Action"];


export default function CourseList() {
  const credit = [3,4,5];
  const {data,isLoading,isError} = useGetCoursesQuery();
 
  const [deleteCourse] = useDeleteCourseMutation();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
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
          {data.map(({_id, courseid, courseName, credithour ,year}, index) => (
         
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
                  <IconButton variant="text" onClick={()=>deleteCourse({id:_id})}>
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
