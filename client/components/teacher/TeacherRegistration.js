import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";

export default function StudentRegistration() {
  const [inputWidth, setInputWidth] = useState(300); // Initial width value
  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [certification, setCertification] = useState('');
  const [curriculumVitae, setCurriculumVitae] = useState('');

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
    console.log("Guardian Phone Number:", guardianPhoneNumber);
    console.log("Guardian Name:", guardianName);
    console.log("Qualification:", qualifications);
    console.log("Certification:", certification);
    console.log("Curriculum Vitae:", curriculumVitae);
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
                  ID
                </Typography>
                <Input
                  size="sm"
                  placeholder="ID"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
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
                <Select
                  size="sm"
                  value={gender}
                  onChange={handleGenderChange}
                  style={{ width: `${inputWidth}px` }} 
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
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
                  Guardian Name
                </Typography>
                <Input
                  size="sm"
                  placeholder="Guardian Name"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Guardian Phone Number
                </Typography>
                <Input
                  size="sm"
                  placeholder="Guardian Phone Number"
                  value={guardianPhoneNumber}
                  onChange={(e) => setGuardianPhoneNumber(e.target.value)}
                  style={{ width: `${inputWidth}px` }} 
                />
                
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
