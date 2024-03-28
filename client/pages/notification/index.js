import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { FaRegBell } from "react-icons/fa"; // Importing the icon

import { useRegisterStudentMutation } from '@/api/api-slice';

export default function NotificationPage() {
  const [inputWidth, setInputWidth] = useState(300); // Initial width value

  const [batch, setBatch] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');

  const [batchError, setBatchError] = useState('');
  const [courseError, setCourseError] = useState('');
  const [messageError, setMessageError] = useState('');

  const handleBatchChange = (value) => {
    setBatch(value);
  };

  const handleCourseChange = (value) => {
    setCourse(value);
  };

  const handleSend = (event) => {
    event.preventDefault();
    // Reset all error messages
    setBatchError('');
    setCourseError('');
    setMessageError('');

    // Validate input fields
    let isValid = true;

    if (batch.trim() === '') {
      setBatchError('Batch is required');
      isValid = false;
    }

    if (course.trim() === '') {
      setCourseError('Course is required');
      isValid = false;
    }

    if (message.trim() === '') {
      setMessageError('Message is required');
      isValid = false;
    }

    if (isValid) {
      // Handle sending notification here
      console.log("Batch:", batch);
      console.log("Course:", course);
      console.log("Message:", message);

      // Code for sending notification goes here
    }
  };

  return (
    <div className="flex justify-center"> {/* Move content to the center */}
      <Card color="transparent" shadow={false} className="">
        <div className="p-8 ">
          <div className="flex items-center mb-4"> {/* Icon and header */}
            <FaRegBell className="mr-2 text-xl text-blue-gray-500" />
            <Typography variant="h4" color="blue-gray">
              Announcement
            </Typography>
          </div>

          <form className="w-full max-w-screen-md" onSubmit={handleSend}>
            <div className="grid grid-cols-2 gap-12">
              <div className="col-span-1">
                <div className="flex flex-col gap-4 mb-8">

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Batch
                  </Typography>
                  <Select
                    size="sm"
                    value={batch}
                    onChange={(e) => handleBatchChange(e.target.value)}
                    onFocus={(e) => handleBatchChange(e.target.value)}
                    style={{ width: `${inputWidth}px` }}
                  >
                    <option value="">Select Batch</option>
                    <option value="Batch A">Batch A</option>
                    <option value="Batch B">Batch B</option>
                    <option value="Batch C">Batch C</option>
                  </Select>
                  {batchError && <Typography variant="caption" color="red">{batchError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Course
                  </Typography>
                  <Select
                    size="sm"
                    value={course}
                    onChange={(e) => handleCourseChange(e.target.value)}
                    onFocus={(e) => handleCourseChange(e.target.value)}
                    style={{ width: `${inputWidth}px` }}
                  >
                    <option value="">Select Course</option>
                    <option value="Course A">Course A</option>
                    <option value="Course B">Course B</option>
                    <option value="Course C">Course C</option>
                  </Select>
                  {courseError && <Typography variant="caption" color="red">{courseError}</Typography>}

                  <Typography variant="h6" color="blue-gray" className="-mb-2">
                    Message
                  </Typography>
                  <Textarea
                    size="sm"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none rounded border border-blue-gray-200 bg-transparent px-3 py-2.5 text-sm text-blue-gray-700 outline-none placeholder-blue-gray-200 focus:border-gray-900 focus:border-t-transparent focus:outline-none"
                    placeholder="Type your message here..."
                    style={{ width: `${inputWidth}px` }}
                  />
                  {messageError && <Typography variant="caption" color="red">{messageError}</Typography>}
                </div>
              </div>
            </div>

            <Button type="submit" className='bg-primary' fullWidth>
              Send
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
