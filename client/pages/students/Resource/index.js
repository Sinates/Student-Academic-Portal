import RootLayout from "@/layouts/RootLayout";
import React, { useState } from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Resource = () => {
    const [courses] = useState([
        { id: 1, name: 'Mathematics' },
        { id: 2, name: 'Physics' },
        { id: 3, name: 'History' }
    ]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [materials, setMaterials] = useState([]);

    const fetchMaterials = (courseId) => {
        // Simulate fetching materials for the selected course
        let materialsData = [];
        if (courseId === 1) {
            materialsData = [
                { id: 1, name: 'Algebra', type: 'PDF' },
                { id: 2, name: 'Geometry', type: 'PDF' },
                { id: 3, name: 'Calculus', type: 'PDF' }
            ];
        } else if (courseId === 2) {
            materialsData = [
                { id: 4, name: 'Mechanics', type: 'PPT' },
                { id: 5, name: 'Electromagnetism', type: 'PPT' },
                { id: 6, name: 'Thermodynamics', type: 'PPT' }
            ];
        } else if (courseId === 3) {
            materialsData = [
                { id: 7, name: 'Ancient Civilization', type: 'PDF' },
                { id: 8, name: 'World Wars', type: 'PDF' },
                { id: 9, name: 'Renaissance', type: 'PDF' }
            ];
        }
        setMaterials(materialsData);
    };

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        fetchMaterials(course.id);
    };

    const handleDownload = (materialId, materialName) => {
        // Simulate file download
        const fileName = `${materialName}.pdf`; // Change the extension based on the material type
        const fileContent = 'Dummy PDF content'; // Replace with actual file content or fetch from the server
        downloadFile(fileContent, fileName);
    };

    const downloadFile = (content, fileName) => {
        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    
    return (
        <RootLayout>
            <div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: '0 20px' }}>
                    {courses.map(course => (
                        <Card key={course.id} onClick={() => handleCourseClick(course)} style={{ margin: '0 5px' }}>
                            <CardContent>
                                {course.name}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {selectedCourse && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Resource</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Download</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materials.map(material => (
                                    <TableRow key={material.id}>
                                        <TableCell>{material.name}</TableCell>
                                        <TableCell>{material.type}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDownload(material.id, material.name)} variant="contained" color="primary">Download</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        </RootLayout>
    );
};

export default Resource;
