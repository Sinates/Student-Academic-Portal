import {
    Card,
    Typography,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import RootLayout from '@/layouts/RootLayout';

  import { FaTrash } from "react-icons/fa";
//   import { useGetTeachersQuery } from "../../api/api-slice";
  import { useRouter } from "next/router";
//   import { useDeleteTeacherMutation } from "../../api/api-slice";
import { useGetTeachersQuery } from "@/api/api-slice";
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField, ThemeProvider, createTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import TopHeader from "@/components/common/Header";
import { useState } from "react";
  
  const TABLE_HEAD = [
    "ID",
    "Full Name",
    "Grade",
    "Actions"
  ];
  
  export default function Grades() {
    // const { data, isLoading, isError ,isSuccess} = useGetTeachersQuery();
    // const [deleteTeacher] = useDeleteTeacherMutation();
 const data = [{ _id:'09',id:'09', name:"Lila", grade:'A' },{ _id:'08',id:'08', name:"Adona", grade:'BA' }];
 const isLoading = false;
 const isSuccess = true;
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [inputValue, setInputValue] = useState('');
    const router = useRouter();
    const handleDelete = (event, teacherId) => {
    //   event.stopPropagation();
    //   deleteTeacher(teacherId)
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
      const handleInputChange = (event) => {
        setInputValue(event.target.value);
      };
      const handleAddGrade = () => {
        console.log('Adding grade:', inputValue);
        handleCloseModal();
      };
      const [selectedCourse, setSelectedCourse] = useState('All');
      const [selectedBatch, setSelectedBatch] = useState('All');
    const theme = createTheme({
        palette: {
            primary: {
                main: '#2196f3', // Primary button color
            },
            secondary: {
                main: '#f44336', // Secondary button color
            },
        },
    });
    const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
      };
    
      const handleBatchChange = (event) => {
        setSelectedBatch(event.target.value);
      };
    return (
        <ThemeProvider theme={theme}>
        <RootLayout>
        <TopHeader />
        <div className='text-3xl text-center'>Grade Management</div>

        <div className="flex justify-center mx-8 mt-10">
        <div className="px-2">
          <Select value={selectedCourse} onChange={handleCourseChange}>
            <MenuItem value="All">All Courses</MenuItem>
            <MenuItem value="Math">Math</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            {/* Add more courses as needed */}
          </Select>
        </div>
        <div>
          <Select value={selectedBatch} onChange={handleBatchChange}>
            <MenuItem value="All">All Batches</MenuItem>
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            {/* Add more batches as needed */}
          </Select>
        </div>
      </div>
      <Card className="h-full  overflow-auto mx-8 mt-10">
        {isLoading && (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
          </div>
        )}
  
        {/* {isError && (
          <Typography variant="body" color="red" className="text-center mt-4 mx-16">
            Error loading Grades. Please try again later.
          </Typography>
        )} */}
        {isSuccess && (
          <table className="w-full min-w-max table-auto text-left px-20">
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
                      className="font-normal text-[#334155] leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(
                (
                  { _id,id, name, grade },
                  index
                ) => (
                  <tr key={id}  className="even:bg-blue-gray-50/50">
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
                        {grade}
                      </Typography>
                    </td>
                    {/* <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {gender == "M"?"Male":"Female"}
                      </Typography>
                    </td> */}
                    {/* <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td> */}
                    {/* <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {phone}
                      </Typography>
                    </td> */}
  
                    <td cl>
                      <Tooltip content="Add Grade">
                        <IconButton className="px-auto" variant="text" onClick={handleOpenModal}>
                          <Add />
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

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle align="center">Add Grade</DialogTitle>
        <DialogContent>
         <div className="px-16 py-5"><TextField
            label="Enter Grade"
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            fullWidth
            autoFocus
          /></div> 
        </DialogContent>
        <div className="flex justify-center p-2">
          <Button variant="outlined" onClick={handleAddGrade}>
            Add
          </Button>
          
        </div>
      </Dialog>
      </RootLayout>
      </ThemeProvider>
    );
  }
  