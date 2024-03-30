import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import RootLayout from '@/layouts/RootLayout';
import { useGetGradeChangeRequestQuery,useUpdateGradeChangeRequestMutation ,useDeleteGradeChangeRequestMutation} from "@/api/api-slice";
import TopHeader from '@/components/common/Header';
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

const GradeChangeRequestsPage = () => {
    const [teacherID, setTeacherID] = useState('');
    useEffect(() => {
        setTeacherID(localStorage.getItem('id'));
    }, [])

    const { data, isLoading, isSuccess, isError } = useGetGradeChangeRequestQuery(teacherID);
    console.log(data);

    const [updateGradeChangeRequest] = useUpdateGradeChangeRequestMutation();
    const [deleteGradeChangeRequest] = useDeleteGradeChangeRequestMutation();

    // Create a custom theme with the desired button colors
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
    if (isLoading)
        return (
            <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
            </div>
        );
    if (isError)
        return (
            <Typography variant="body" color="red" className="text-center mt-4 mx-16">
                Error loading requests. Please try again later.
            </Typography>
        );
    if (isSuccess)
        if (data?.length === 0)
            return (
                <div className="flex items-center justify-center h-40">
                    <div className=" text-blue-gray-900">No Pending Requests</div>
                </div>
            );
    const handleAccept = (id) => {
      const response =  updateGradeChangeRequest({ id, data:{isApproved: true} });
      console.log(response);
    }
    const handleDecline = (id) => {
        const response =  deleteGradeChangeRequest( id);
        console.log(response);
      }
    return (

        <ThemeProvider theme={theme}>
            <RootLayout>
                <TopHeader />

                <Grid className='m-6 space-y-10'>
                    {data?.data?.map(request => (
                        <div key={request.id}>
                            <Card>
                                <CardContent>
                                    <Grid container spacing={2} justifyContent="space-around">
                                        <Grid item xs={12} md={6} >
                                            <Typography variant="h5" component="h2" >
                                                Student: {request?.student?.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography color="textSecondary">
                                                Department: {request?.student?.department}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="body2" component="p" color="textSecondary">
                                                Course: {request?.course?.courseName}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <Typography variant="body2" component="p" color="textSecondary">
                                                Reason: {request?.optionalNote}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <Typography variant="body2" component="p" color="textSecondary">
                                                Change on: {request?.typeOfAssessment}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                                <button className="bg-[#58A399] bg-opacity-10 text-[#58A399] text-sm px-4 py-2 rounded-md flex" onClick={()=>handleAccept(request?._id)} >
                                                    <IoMdCheckmark size={18} /> <span className="ml-2">Accept</span>
                                                </button>
                                                <button className="bg-[#CB373D] bg-opacity-10 text-[#CB373D] text-sm px-2 py-2 rounded-md ml-4 flex" onClick={()=>handleDecline(request?._id)} >
                                                    <IoMdClose size={18} /> <span>Decline</span>
                                                </button>
                                            </div>
                                        </Grid>

                                    </Grid>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </Grid>
            </RootLayout>
        </ThemeProvider>
    );
};

export default GradeChangeRequestsPage;
