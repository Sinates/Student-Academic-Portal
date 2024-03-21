import React, { useState } from 'react';
import RootLayout from '@/layouts/RootLayout';
import TopHeader from '@/components/common/Header.js';

const GradeReport = () => {
    // Sample data for demonstration
    const [selectedCourse, setSelectedCourse] = useState(null);
    const gradeData = [
        { courseName: 'Mathematics', crhr: '3', grade: 'A', teacher: 'Mr. Smith', attendance: '90%', midExam: '85', finalExam: '88', assignment: '95' },
        { courseName: 'Physics', crhr: '4', grade: 'B', teacher: 'Ms. Johnson', attendance: '92%', midExam: '78', finalExam: '82', assignment: '90' },
        { courseName: 'Chemistry', crhr: '3', grade: 'A', teacher: 'Dr. Brown', attendance: '88%', midExam: '90', finalExam: '87', assignment: '92' },
        // Add more data as needed
    ];

    // Calculate semester GPA and cumulative GPA (Sample values)
    const semesterGPA = 3.8;
    const cumulativeGPA = 3.6;

    // Component for the modal content
    const CourseModal = ({ course }) => (
        <tr>
            <td colSpan="3">
                <div className="absolute z-10 bg-white p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
                    <p>Teacher: {course.teacher}</p>
                    <p>Attendance: {course.attendance}</p>
                    <p>Mid Exam: {course.midExam}</p>
                    <p>Final Exam: {course.finalExam}</p>
                    <p>Assignment: {course.assignment}</p>
                </div>
            </td>
        </tr>
    );

    return (
        <RootLayout>
            <TopHeader/>
            <div className="container mx-auto py-8 w-[90%]">
                <h1 className="text-3xl font-bold mb-6">Grade Report</h1>
                <div className="border border-gray-300 rounded-lg p-4 relative">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Course Name</th>
                                <th className="border border-gray-300 px-4 py-2">CRHR</th>
                                <th className="border border-gray-300 px-4 py-2">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gradeData.map((item, index) => (
                                <React.Fragment key={index}>
                                    <tr
                                        onClick={() => setSelectedCourse(selectedCourse === index ? null : index)}
                                        className={`cursor-pointer ${selectedCourse === index ? 'bg-gray-100' : ''}`}
                                    >
                                        <td className="border border-gray-300 px-4 py-2">{item.courseName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.crhr}</td>
                                        <td className="border border-gray-300 px-4 py-2">{item.grade}</td>
                                    </tr>
                                    {selectedCourse === index && <CourseModal course={item} />}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-end">
                        <div>
                            <p>Semester GPA: {semesterGPA}</p>
                            <p>Cumulative GPA: {cumulativeGPA}</p>
                        </div>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
};

export default GradeReport;
