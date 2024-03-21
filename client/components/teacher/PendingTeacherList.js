import React from 'react'
import PendingTeacherCard from './PendingTeacherCard'

function PendingTeacherList() {
  return (
    <div className='grid grid-cols-3 gap-4 mx-16'>
      <PendingTeacherCard/>
      <PendingTeacherCard/>
      <PendingTeacherCard/>
      <PendingTeacherCard/>
      <PendingTeacherCard/>
    </div>
  )
}

export default PendingTeacherList
