import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TeacherRegistration from '@/components/teacher/TeacherRegistration';
import StudentRegistration from '@/components/student/StudentRegistration'; 
 
function Registration() {
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = React.useState("student");
  const data = [
    {
      label: "Student",
      value: "student",
      desc: <StudentRegistration/>,
    },
    {
      label: "Teacher",
      value: "teacher",
      desc: <TeacherRegistration/>,
    },
   
  ]

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Submitted!");
    console.log("ID:", id);
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Gender:", gender);
    console.log("Password:", password);
    console.log("Phone Number:", phoneNumber);
  };

  return (
    <div className="flex justify-start">
       <div >
        <img src="/student.png" alt="Image" className="w-full h-auto w-65 h-auto" style={{ marginLeft: '50px', marginTop:'77px' }} />
      </div>
           <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900 font-bold" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody className=''>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>

    </div>
  );
}

export default Registration;
