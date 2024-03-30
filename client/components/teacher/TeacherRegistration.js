import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { useRegisterTeacherMutation } from '@/api/api-slice';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function StudentRegistration() {
  const [inputWidth, setInputWidth] = useState(300); // Initial width value
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [qualifications, setQualifications] = useState('');
  const [certification, setCertification] = useState('');
  const [curriculumVitae, setCurriculumVitae] = useState('');
  const [registerTeacher] = useRegisterTeacherMutation();
  const [fullNameError, setFullNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [qualificationsError, setQualificationsError] = useState('');
  const [certificationError, setCertificationError] = useState('');
  const [curriculumVitaeError, setCurriculumVitaeError] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset error messages
    setFullNameError('');
    setEmailError('');
    setGenderError('');
    setPasswordError('');
    setPhoneNumberError('');
    setQualificationsError('');
    setCertificationError('');
    setCurriculumVitaeError('');

    // Validate inputs
    let isValid = true;

    if (fullName.trim() === '') {
      setFullNameError('Full Name is required');
      isValid = false;
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
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
      setConfirmPasswordError('Password is required');
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    }

    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Phone Number is required');
      isValid = false;
    }

    if (qualifications.trim() === '') {
      setQualificationsError('Qualifications is required');
      isValid = false;
    }

    if (certification.trim() === '') {
      setCertificationError('Certification is required');
      isValid = false;
    }

    if (curriculumVitae.trim() === '') {
      setCurriculumVitaeError('Curriculum Vitae is required');
      isValid = false;
    }

    if (isValid) {
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
      const response = registerTeacher({
        data: {
          name: fullName,
          email: email,
          phone: phoneNumber,
          gender: gender,
          password: password,
          qualifications: qualifications,
          certification: certification,
          curriculumVitae: curriculumVitae
        }
      });
      // if (response && response.error !== null)
      //   toast.error("Error occured while registering!");
      // else {
      //   toast.success("You have successfully registered!");
      // }
    }
  };

  return (
    <Card color="transparent" shadow={false} className="">
      <ToastContainer />
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
                {fullNameError && <span className="text-red-500">{fullNameError}</span>}
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
                {emailError && <span className="text-red-500">{emailError}</span>}
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
                {phoneNumberError && <span className="text-red-500">{phoneNumberError}</span>}
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
                {genderError && <span className="text-red-500">{genderError}</span>}
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
                {passwordError && <span className="text-red-500">{passwordError}</span>}
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
                {confirmPasswordError && <span className="text-red-500">{confirmPasswordError}</span>}
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-4" style={{ marginLeft: '70px' }}>
              <div className="flex flex-col gap-4 ">
                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Qualifications
                </Typography>
                <Input
                  type="text"
                  size="sm"
                  onChange={(e) => setQualifications(e.target.value)}
                  style={{ width: `${inputWidth}px` }}
                />
                <Typography variant="caption" className='italic text-primary'>
                  Please provide a link to the file on Google Drive.
                </Typography>
                {qualificationsError && <span className="text-red-500">{qualificationsError}</span>}

                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Certification
                </Typography>
                <Input
                  type="text"
                  size="sm"
                  onChange={(e) => setCertification(e.target.value)}
                  style={{ width: `${inputWidth}px` }}
                />
                <Typography variant="caption" className='italic text-primary'>
                  Please provide a link to the file on Google Drive.
                </Typography>
                {certificationError && <span className="text-red-500">{certificationError}</span>}

                <Typography variant="h6" color="blue-gray" className="-mb-2">
                  Curriculum Vitae
                </Typography>
                <Input
                  type="text"
                  size="sm"
                  onChange={(e) => setCurriculumVitae(e.target.value)}
                  style={{ width: `${inputWidth}px` }}
                />
                <Typography variant="caption" className='italic text-primary'>
                  Please provide a link to the file on Google Drive.
                </Typography>
                {curriculumVitaeError && <span className="text-red-500">{curriculumVitaeError}</span>}
              </div>
            </div>
          </div>

          <Button type="submit" className='bg-primary' fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </Card>
  );
}
