import RootLayout from '@/layouts/RootLayout'
 
import TopHeader from '@/components/common/Header'
import React from 'react'
import TeacherViewNotification from '@/components/notification/TeacherViewNotification'
 
function Notification() {
  return (
    <RootLayout>
    <  TopHeader/>
    <TeacherViewNotification/>
 
    </RootLayout>
  )
}

export default Notification
