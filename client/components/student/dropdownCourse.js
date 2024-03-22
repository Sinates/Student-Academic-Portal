import React, { useState, useEffect } from 'react';

function CourseDropdown({ onChange, value, error }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:8000/admin/courselist')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        // Update component state with fetched data
        const uniqueCourses = data.reduce((unique, course) => {
          if (!unique.some(item => item.courseid === course.courseid)) {
            unique.push(course);
          }
          return unique;
        }, []);
        setCourses(uniqueCourses);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleDropdownChange = event => {
    setSelectedCourseId(event.target.value);
    // Call the onChange function passed as prop
    onChange(event);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <label htmlFor="courseDropdown">Select a course:</label>
      <select id="courseDropdown" value={selectedCourseId} onChange={handleDropdownChange}>
        <option value="">Select...</option>
        {courses.map(course => (
          <option key={course._id} value={course.courseid}>
            {course.courseName}
          </option>
        ))}
      </select>
      {selectedCourseId && <p>Selected course ID: {selectedCourseId}</p>}
    </div>
  );
}

export default CourseDropdown;
