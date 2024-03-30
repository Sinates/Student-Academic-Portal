import RootLayout from '@/layouts/RootLayout';
import React, { useState, useEffect } from 'react';
import { AppBar, Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TopHeader from '@/components/common/Header';
import Header from '@/components/common/Header';
import { useUploadPaymentMutation } from '@/api/api-slice';
import Image from "next/image";
function Payment() {
  const [formData, setFormData] = React.useState({
    id: '',
    receipt: null,
  });

  const [fileName, setFileName] = useState();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [uploadPayment] = useUploadPaymentMutation();
  useEffect(() => {
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setFileName(file.name);
    } else {
      setPreviewUrl(undefined);
    }
  }, [file]);
  const removeImage = () => {
    setFile(undefined);
    setPreviewUrl(undefined);
  };
  const [studentID, setStudentID] = useState('');
  useEffect(() => {
    setStudentID(localStorage.getItem('id'));
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('id', formData.id);
    formDataToSend.append('paymentReceipt', file); // Updated key name
    const reponse = await uploadPayment({ id: studentID, data: formDataToSend });


    // Reset form after successful submission
    setFormData({
      id: '',
      receipt: null,
    });
    removeImage();

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      receipt: file,
    });
  };

  return (
    <RootLayout>
      <TopHeader />


      <div className="mt-6 col-span-2">
        <label
          htmlFor="email"
          className="mt-2 ml-14 block text-gray-700 font-medium text-lg"
        >
          Upload Payment Receipt{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="container w-[96%] mx-auto items-center">
          <div className="pb-6 pt-4">
            <div
              id="image-preview"
              className={`w-full overflow-hidden mb-4 h-56 bg-gray-50  ${"border-dashed border-2 border-gray-300"
                } rounded-lg items-center mx-auto text-center cursor-pointer`}
            >
              <div
                className={`m-6 ${previewUrl ? "hidden" : ""
                  } my-10`}
              >
                <input
                  id="upload"
                  type="file"

                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  name="thumbnailImageFile"
                  className="hidden"
                  accept="image/*"
                />
                <label
                  htmlFor="upload"
                  className="cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-700">
                    Choose a photo or drag and
                    drop it here
                  </h5>
                  <p className="font-light text-sm text-gray-400 md:px-6">
                    <b className="text-gray-600">
                      JPG, PNG, or JPEG
                    </b>{" "}
                    format upto 2MB.
                  </p>
                </label>
              </div>

              {previewUrl && (
                <Image
                  className="mx-auto mt-0.5"
                  src={previewUrl}
                  alt={""}
                  width={400}
                  height={150}
                />
              )}
            </div>



            {previewUrl && (
              <button
                onClick={removeImage}
                className="flex justify-center w-fit items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-primary border border-primary"
              >
                <div className="text-xs font-normal leading-none flex-initial">
                  {fileName}
                </div>
                <div className="flex flex-auto flex-row-reverse">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
                    >
                      <line
                        x1="18"
                        y1="6"
                        x2="6"
                        y2="18"
                      ></line>
                      <line
                        x1="6"
                        y1="6"
                        x2="18"
                        y2="18"
                      ></line>
                    </svg>
                  </div>
                </div>
              </button>

            )}
            <div className='flex justify-end mr-10'>
              <button className='bg-primary text-white p-4 rounded-md mr-10' onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>


    </RootLayout>
  );
}

export default Payment;
