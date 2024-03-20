import React from 'react'
import PendingStudentCard from './PendingStudentCard'
import { pendingStudents } from "../../data/student";

function PendlingStudentList() {

  return (
    <div className='grid grid-cols-3 gap-4'>
      {pendingStudents.map((student) => (
        <PendingStudentCard key={student.id} student={student} />
      ))}
    </div>
  );
}

export default PendlingStudentList
