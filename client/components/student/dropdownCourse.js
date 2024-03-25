// CourseDropdown.js
import React, { useState, useEffect } from 'react';

function CourseDropdown({ onChange }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:8000/admin/courselist')
      .then(response => response.json())
      .then(data => {
        // Update component state with fetched data
        setCourses(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDropdownChange = event => {
    const selectedCourseId = event.target.value;
    // Call the onChange function passed as prop
    onChange(selectedCourseId);
  };

  return (
    <div>
      <label htmlFor="courseDropdown">Select a course:</label>
      <select id="courseDropdown" onChange={handleDropdownChange}>
        <option value="">Select...</option>
        {courses.map(course => (
          <option key={course._id} value={course.courseid}>
            {course.courseName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CourseDropdown;
