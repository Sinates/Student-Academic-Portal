import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import DropdownComponent from "@/components/student/dropDown";
import CourseDropdown from "@/components/student/dropdownCourse";
import RootLayout from '@/layouts/RootLayout';
import TopHeader from '@/components/common/Header';
import { useGetCoursesQuery, useGetTeachersQuery } from "@/api/api-slice";

const GradeChange = () => {
  const [formData, setFormData] = useState({
    studentId: '',
    teacherId: '', // Added teacherId to formData
    message: '',
    mid: '',
    gradeType: '',
    final: '',
    assessment: '',
    course: '', // Added course to formData
  });
  const [formErrors, setFormErrors] = useState({});
  const [teacher, setTeacher] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Remove error message when input field is edited
    setFormErrors({ ...formErrors, [name]: '' });
  };
  const {data:teachers, isLoading:isTeachersLoading,isError:isTeachersError} = useGetTeachersQuery();
  const {data:courses, isLoading:isCoursesLoading,isError:isCoursesError} = useGetCoursesQuery();

  // Updated handleTeacherChange to set teacherId in formData
  const handleTeacherChange = (teacherId) => {
    setFormData({ ...formData, teacherId });
  };

  // Updated handleCourseChange to set course in formData
  const handleCourseChange = (course) => {
    setFormData({ ...formData, course });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const errors = {};
    // Check if any fields are empty
    for (const key in formData) {
      // Check if the value is a string before calling trim()
      if (typeof formData[key] === 'string' && formData[key].trim() === '') {
        errors[key] = 'This field is required';
      }
    }
    // Update errors state
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      // Serialize formData, filtering out non-serializable values
      const serializedFormData = {};
      for (const key in formData) {
        if (typeof formData[key] !== 'function' && typeof formData[key] !== 'object') {
          serializedFormData[key] = formData[key];
        }
      }
  
      // All fields are filled, send data to server
      try {
        
        const response = await fetch('http://localhost:8000/student/gradeChangeRequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serializedFormData),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Data sent successfully:', data);
          // Optionally, you can perform additional actions after successful data submission
        } else {
          console.error('Failed to send data:', response.statusText);
          // Handle error accordingly
        }
      } catch (error) {
        console.error('Error sending data:', error.message);
        // Handle error accordingly
      }
    } else {
      console.error('Form has errors:', errors);
    }
  };
  if (  isTeachersLoading || isCoursesLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-gray-900"></div>
      </div>
    );
  }

  if (isTeachersError || isCoursesError) {
    return (
      <div className="flex items-center justify-center h-40">
        <div>Error fetching data</div>
      </div>
    );
    return ;
  }

  return (
    <RootLayout>
      <TopHeader/>
      <Container maxWidth="sm">
        <Box
          sx={{
            padding: 6,
            borderRadius: 8,
            border: '1px solid #ccc',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Grade Change Request
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className='my-4'>
              <label htmlFor="teacher" className="mr-4 text-md">Select a teacher</label>
              <select  className="w-30 text-black border border-gray-400 rounded-md p-2"  id="teacher" name="teacher" value={formData.teacherId} helperText={formErrors.teacherId}  onChange={(e)=> handleTeacherChange(e.target.value)}>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                ))}
              </select>
              {formErrors.teacherId && <div style={{ color: 'red' }}>{formErrors.teacherId}</div>}
            </div>
            <div className='my-4'>
              <label htmlFor="course" className="mr-4 text-md">Select a course</label>
              <select className="w-30 text-black border border-gray-400 rounded-md p-2" id="course" name="course" value={formData.course} helperText={formErrors.course}  onChange={(e)=> handleCourseChange(e.target.value)}>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>{course.courseName}</option>
                ))}
              </select>
              {formErrors.course && <div style={{ color: 'red' }}>{formErrors.course}</div>}
            </div>
            <div className='my-4'>
              <label>Grade Type:</label>
              <div className='space-x-6 mt-2'>
                <label>
                  <input
                    type="radio"
                    name="gradeType"
                    value="midterm"
                    checked={formData.gradeType === "midterm"}
                    onChange={handleChange}
                  />
                  Midterm
                </label>
                <label>
                  <input
                    type="radio"
                    name="gradeType"
                    value="final"
                    checked={formData.gradeType === "final"}
                    onChange={handleChange}
                  />
                  Final
                </label>
                <label>
                  <input
                    type="radio"
                    name="gradeType"
                    value="assessment"
                    checked={formData.gradeType === "assessment"}
                    onChange={handleChange}
                  />
                  Assessment
                </label>
              </div>
              {formErrors.gradeType && <div style={{ color: 'red' }}>{formErrors.gradeType}</div>}
              </div>
          
            <TextField fullWidth label="Message" name="message" className='my-4' multiline rows={4} value={formData.message} onChange={handleChange} error={!!formErrors.message} helperText={formErrors.message} />
            {formErrors.message && <div style={{ color: 'red' }}>{formErrors.message}</div>}
            <button
              className="bg-primary mt-4 p-4 rounded-md text-white"
              ripple="light"
              type="submit"
            >
              Submit
            </button>
          </form>
        </Box>
      </Container>
    </RootLayout>
  );
};

export default GradeChange;
