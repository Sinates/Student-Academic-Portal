import RootLayout from '@/layouts/RootLayout'
 
import TopHeader from '@/components/common/Header'
import React from 'react'
import StudentViewNotification from '@/components/notification/StudentViewNotification'

function Notification() {
  return (
    <RootLayout>
    <  TopHeader/>
    <StudentViewNotification/>
 
    </RootLayout>
  )
}

export default Notification
