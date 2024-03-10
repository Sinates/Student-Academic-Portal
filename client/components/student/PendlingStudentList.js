import React from 'react'
import PendingStudentCard from './PendingStudentCard'

function PendlingStudentList() {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <PendingStudentCard/>
      <PendingStudentCard/>
      <PendingStudentCard/>
      <PendingStudentCard/>
      <PendingStudentCard/>
    </div>
  )
}

export default PendlingStudentList
