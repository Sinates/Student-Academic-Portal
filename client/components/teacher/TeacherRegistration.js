import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import  {useRegisterTeacherMutation} from '@/api/api-slice';
export default function StudentRegistration() {
  const [inputWidth, setInputWidth] = useState(300); // Initial width value
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [certification, setCertification] = useState('');
  const [curriculumVitae, setCurriculumVitae] = useState('');
  const [registerTeacher]=useRegisterTeacherMutation();
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log("Submitted!");
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Gender:", gender);
    console.log("Password:", password);
    console.log("Phone Number:", phoneNumber);
    console.log("Qualification:", qualifications);
    console.log("Certification:", certification);
    console.log("Curriculum Vitae:", curriculumVitae);
    registerTeacher({data:{
      name:fullName,
      email:email,
      phone:phoneNumber,
      gender:gender,
      password:password,
      qualifications:qualifications,
      certification:certification,
      curriculumVitae:curriculumVitae
    }})
  };

  return (
    <Card color="transparent" shadow={false} className="">
      <div className="p-8">
        <Typography variant="h4" color="blue-gray">
          Student Registration
        </Typography>
        
        <form className="w-full max-w-screen-md" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-12">
            <div className="col-span-1">
              <div className="flex flex-col gap-4  mb-8  ">

                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Full Name
                </Typography>
                <Input
                  size="sm"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Email
                </Typography>
                <Input
                  size="sm"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Phone Number
                </Typography>
                <Input
                  size="sm"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Gender
                </Typography>
                <select
                  size="sm"
                  value={gender}
                  className='h-10 rounded-md bg-transparent border-gray-500 border px-2'
                  onChange={handleGenderChange}
                  style={{ width: `${inputWidth}px` }} 
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Password
                </Typography>
                <Input
                  type="password"
                  size="sm"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-4" style={{ marginLeft: '70px' }}>

              <div className="flex flex-col gap-4 " >
            
            
                
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Qualifications
                </Typography>
                <Input
                  type="file"
                  size="sm"
                  onChange={(e) => setQualifications(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
                
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Certification
                </Typography>
                <Input
                  type="file"
                  size="sm"
                  onChange={(e) => setCertification(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
                
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  curriculum Vitae
                </Typography>
                <Input
                  type="file"
                  size="sm"
                  onChange={(e) => setCurriculumVitae(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" fullWidth>
            Continue
          </Button>
        </form>
      </div>
    </Card>
  );
}
