import React, { useState, useEffect } from 'react';

function DropdownComponent({ onChange, value, error }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');

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
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  const handleDropdownChange = event => {
    setSelectedTeacherId(event.target.value);
    // Call the onChange function passed as prop
    onChange(event);
  };

  return (
    <div>
      <label htmlFor="teacherDropdown">Select a teacher:</label>
      <select id="teacherDropdown" value={selectedTeacherId} onChange={handleDropdownChange}>
        <option value="">Select...</option>
        {teachers.map(teacher => (
          <option key={teacher.id} value={teacher.id}>
            {teacher.name}
          </option>
        ))}
      </select>
      {selectedTeacherId && <p>Selected teacher ID: {selectedTeacherId}</p>}
    </div>
  );
}

export default DropdownComponent;
