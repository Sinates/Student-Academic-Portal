import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from "@material-tailwind/react";
 

export default function TeacherRegistrationPage2(){
    const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
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
        <Card color="transparent" shadow={false} className="">
        <div className="p-8 " >
          <Typography variant="h4" color="blue-gray">
            Teacher Registration
          </Typography>
        
          <form className="mt-4 mb-2 w-80 max-w-screen-md sm:w-96  " onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-4">
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              ID
            </Typography>
            <Input
              size="sm"
              placeholder="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Full Name
            </Typography>
            <Input
              size="sm"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Email
            </Typography>
            <Input
              size="sm"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Phone Number
            </Typography>
            <Input
              size="sm"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Gender
            </Typography>
            <Select
              size="sm"
              value={gender}
              onChange={handleGenderChange}
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
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
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button type="submit" className="mt-6" fullWidth>
            Continue
          </Button>
          </form>
        </div>
      </Card>
    )
}