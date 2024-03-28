import React, { useState } from 'react';
import { Card, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Grid, Paper } from '@mui/material';
import { ExpandMore, Add } from '@mui/icons-material';
import RootLayout from '@/layouts/RootLayout';
import TopHeader from '@/components/common/Header';

// Dummy data for courses and course materials
const coursesData = [
  {
    id: 1,
    name: 'Mathematics',
    materials: [
      { id: 101, name: 'Algebra.pdf' },
      { id: 102, name: 'Geometry.pdf' },
    ],
  },
  {
    id: 2,
    name: 'Science',
    materials: [
      { id: 201, name: 'Physics.pdf' },
      { id: 202, name: 'Chemistry.pdf' },
    ],
  },
];

export default function courseResources() {
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedCourse(isExpanded ? panel : null);
  };

  const handleUploadMaterial = (courseId) => {
    // Implement logic to upload material for the selected course
    console.log('Uploading material for course:', courseId);
  };

  return (
    <RootLayout>
      <TopHeader />
      <div className='text-3xl text-center'>Course Materials</div>
      <Card className="h-full overflow-auto mx-8 mt-10 p-4">
        {coursesData.map((course) => (
          <Accordion
            key={course.id}
            expanded={expandedCourse === `panel${course.id}`}
            onChange={handleAccordionChange(`panel${course.id}`)}
          >
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${course.id}-content`} id={`panel${course.id}-header`}>
              <Typography>{course.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {course.materials.map((material) => (
                  <Grid item xs={12} sm={6} md={4} key={material.id}>
                    <Paper elevation={3} className="p-2">
                      <Typography>{material.name}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<Add />}
                onClick={() => handleUploadMaterial(course.id)}
                className="mt-4"
              >
                Add Material
              </Button>
            </AccordionDetails>
          </Accordion>
        ))}
      </Card>
    </RootLayout>
  );
}