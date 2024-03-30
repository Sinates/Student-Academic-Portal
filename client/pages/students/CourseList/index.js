import React,{useState,useEffect} from "react";
import { Card, Typography , IconButton,
    Tooltip } from "@material-tailwind/react";
import { IoPencil } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import RootLayout from "@/layouts/RootLayout";
import StudentHeader from "@/components/common/StudentHeader";
import { useGetStudentCoursesQuery } from "@/api/api-slice";
import { TableRows } from "@mui/icons-material";

const TABLE_HEAD = ["Course Code", "Course Name", "Credit Hour", "Grade","Status"];

const TABLE_ROWS = [
  {
    grade:"A",
    status:"Taken"
  },
  {
    grade:"A",
    status:" Taken"
  },
  {

    grade:"N/A",
    status:"Not Taken"
  },
  {
    grade:"B+",
    status:"Taken"
  },
  {

    grade:"N/A",
    status:"Not Taken"
  },
  {
    grade:"B",
    status:" Taken"
  },
  {
    grade:"N/A",
    status:"Not Taken"
  },
  {
    grade:"A",
    status:"Taken"
  },
  {
    grade:"A",
    status:" Taken"
  },
  {

    grade:"N/A",
    status:"Not Taken"
  },
  {
    grade:"N/A",
    status:"Not Taken"
  },
  {

    grade:"N/A",
    status:"Not Taken"
  },
  {
    grade:"N/A",
    status:" Not Taken"
  },
  {
    grade:"N/A",
    status:"Not Taken"
  },
];

export default function CourseList() {
  const [studentID, setStudentID] = useState('');
  useEffect(() => {
    setStudentID(localStorage.getItem('id'));
  }, [])
  const {data,isLoading,isError,isSuccess} = useGetStudentCoursesQuery(studentID)
  if (isLoading)
  return (
    <div className="flex items-center justify-center h-40">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
    </div>
  );
  if (isError)
  return (
    <Typography variant="body" color="red" className="text-center mt-4 mx-16">
      Error loading courses. Please try again later. 
    </Typography>
  );
  if(isSuccess)
  return (<RootLayout>
          <StudentHeader />
    <Card className="h-full  overflow-auto mx-16 mt-10">
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
        {data?.courses.map(({course ,grade}, index) => (

         

            <tr key={name} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {course.courseid}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {course.courseName}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {course.credithour}
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
                >{grade?"Taken":"Not Taken"}
                </Typography>
              </td>
          
             
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
    </RootLayout>
  );
}
