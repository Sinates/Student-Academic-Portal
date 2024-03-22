import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { useRegisterStudentMutation } from '@/api/api-slice';

export default function StudentRegistration() {
  const [inputWidth, setInputWidth] = useState(300); // Initial width value

  const [id, setId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guardianPhoneNumber, setGuardianPhoneNumber] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [department, setDepartment] = useState('');
  const [aboutYou, setAboutYou] = useState('');
  const [academicRecord, setAcademicRecord] = useState(null);

  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [guardianNameError, setGuardianNameError] = useState('');
  const [guardianPhoneNumberError, setGuardianPhoneNumberError] = useState('');
  const [departmentError, setDepartmentError] = useState('');
  const [aboutYouError, setAboutYouError] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const [registerStudent] = useRegisterStudentMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset all error messages
    setFullNameError('');
    setEmailError('');
    setPhoneNumberError('');
    setGenderError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setGuardianNameError('');
    setGuardianPhoneNumberError('');
    setDepartmentError('');
    setAboutYouError('');

    // Validate input fields
    let isValid = true;

    if (fullName.trim() === '') {
      setFullNameError('Full Name is required');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    }

    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone Number is required');
      isValid = false;
    }

    if (gender.trim() === '') {
      setGenderError('Gender is required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (guardianName.trim() === '') {
      setGuardianNameError('Guardian Name is required');
      isValid = false;
    }

    if (guardianPhoneNumber.trim() === '') {
      setGuardianPhoneNumberError('Guardian Phone Number is required');
      isValid = false;
    }

    if (department.trim() === '') {
      setDepartmentError('Department is required');
      isValid = false;
    }

    if (aboutYou.trim() === '') {
      setAboutYouError('About You is required');
      isValid = false;
    }

    if (isValid) {
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
      console.log("Department:", department);
      console.log("About You:", aboutYou);
      console.log("Academic Record:", academicRecord);
      registerStudent({
        data: {
          name: fullName,
          email: email,
          gender: gender,
          phone: phoneNumber,
          guardianName: guardianName,
          guardianPhone: guardianPhoneNumber,
          password: password,
          aboutYou: aboutYou,
          department: department,
          academicRecord: academicRecord
        }
      });
    }
  };

  return (
    <div className="flex justify-between">
      <Card color="transparent" shadow={false} className="">
        <div className="p-8 ">
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
                    style={{ width: `${inputWidth}px` }}
                  />
                  {fullNameError && <Typography variant="caption" color="red">{fullNameError}</Typography>}

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
                  {emailError && <Typography variant="caption" color="red">{emailError}</Typography>}

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
                  {phoneNumberError && <Typography variant="caption" color="red">{phoneNumberError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Gender
                  </Typography>
                  <select
                    size="sm"
                    className='h-10 rounded-md bg-transparent border-gray-500 border px-2'
                    value={gender}
                    onChange={handleGenderChange}
                    style={{ width: `${inputWidth}px` }}
                  >

                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {genderError && <Typography variant="caption" color="red">{genderError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: `${inputWidth}px` }}
                  />
                  {passwordError && <Typography variant="caption" color="red">{passwordError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Confirm Password
                  </Typography>
                  <Input
                    type="password"
                    size="sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ width: `${inputWidth}px` }}
                  />
                  {confirmPasswordError && <Typography variant="caption" color="red">{confirmPasswordError}</Typography>}
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-4" style={{ marginLeft: '70px' }}>

                <div className="flex flex-col gap-4 " >
                  <Typography variant="h6" color="blue-gray" className="-mb-2 ">
                    Guardian Name
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Guardian Name"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    style={{ width: `${inputWidth}px` }}
                  />
                  {guardianNameError && <Typography variant="caption" color="red">{guardianNameError}</Typography>}

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
                  {guardianPhoneNumberError && <Typography variant="caption" color="red">{guardianPhoneNumberError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Department
                  </Typography>
                  <select
                    size="sm"
                    className='h-10 rounded-md bg-transparent border-gray-500 border px-2'
                    value={department}
                    onChange={(e) => {
                      console.log(e)
                      setDepartment(e.target.value)
                    }}
                    style={{ width: `${inputWidth}px` }}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software">Software Engineering</option>
                  </select>
                  {departmentError && <Typography variant="caption" color="red">{departmentError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    About You
                  </Typography>
                  <Textarea
                    size="sm"
                    value={aboutYou}
                    onChange={(e) => setAboutYou(e.target.value)}
                    className="resize-none rounded border border-blue-gray-200 bg-transparent px-3 py-2.5 text-sm text-blue-gray-700 outline-none placeholder-blue-gray-200 focus:border-gray-900 focus:border-t-transparent focus:outline-none"
                    placeholder="Tell us about yourself..."
                    style={{ width: `${inputWidth}px` }}
                  />
                  {aboutYouError && <Typography variant="caption" color="red">{aboutYouError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Academic Record
                  </Typography>
                  <Input
                    type="file"
                    size="sm"
                    onChange={(e) => setAcademicRecord(e.target.value)}
                    style={{ width: `${inputWidth}px` }}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className='bg-primary' fullWidth>
              Submit
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
