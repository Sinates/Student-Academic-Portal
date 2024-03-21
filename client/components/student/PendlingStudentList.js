import React, { useState } from 'react'
import PendingStudentCard from './PendingStudentCard'
import { pendingStudents } from "../../data/student";

function PendlingStudentList() {
  const[pStudents, setPStudents] = useState(pendingStudents)
  function removeStudent(index) {
    const updatedStudents = [...pStudents];
    updatedStudents.splice(index, 1);
    setPStudents(updatedStudents);
  }
  return (
    <div className='grid grid-cols-3 gap-4 mx-16'>
      {pStudents.map((student) => (
        <PendingStudentCard key={student.id} student={student} removeStudent={removeStudent} />
      ))}
    </div>
  );
}

export default PendlingStudentList
