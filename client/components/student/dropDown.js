// DropdownComponent.js
import React, { useState, useEffect } from 'react';

function DropdownComponent({ onChange }) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:8000/admin/getteachers')
      .then(response => response.json())
      .then(data => {
        // Update component state with fetched data
        setTeachers(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDropdownChange = event => {
    const selectedTeacherId = event.target.value;
    // Call the onChange function passed as prop
    onChange(selectedTeacherId);
  };

  return (
    <div>
      <label htmlFor="teacherDropdown">Select a teacher:</label>
      <select id="teacherDropdown" onChange={handleDropdownChange}>
        <option value="">Select...</option>
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownComponent;
