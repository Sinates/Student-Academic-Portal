import RootLayout from "@/layouts/RootLayout";
import React, { useState } from "react";
import StudentHeader from "@/components/common/StudentHeader";
import { FaDownload } from "react-icons/fa";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
} from "@material-tailwind/react";

function Resource() {
  const [courses] = useState([
    {
      id: 1,
      name: "Data structures and algorithms",
      materialsData: [
        
        { id: 3, name: "Sorting", type: "PDF" , file:"Chapter 5 Short Note.pdf"},
        { id: 3, name: "Binary Search", type: "PDF", file:"Chapter 5 Short Note.pdf"},
        { id: 1, name: "Stack", type: "PDF" ,file:"Chapter 6 Short Note.pdf"},
        { id: 2, name: "Queue", type: "PDF",file:"Chapter 5 Short Note.pdf" },
      ],
    },
    {
      id: 2,
      name: "Database",
      materialsData: [
        { id: 4, name: "1st normal form", type: "PPT",file:"Chapter 5 Short Note.pdf" },
        { id: 5, name: "Second normal form", type: "PPT",file:"Chapter 5 Short Note.pdf" },
        { id: 6, name: "Third normal form", type: "PPT" ,file:"Chapter 5 Short Note.pdf"},
        { id: 7, name: "ER digram", type: "PPT" ,file:"Chapter 5 Short Note.pdf"},
      ],
    },
    {
      id: 3,
      name: "Compiler Design",
      materialsData: [
        { id: 7, name: "Chapter1", type: "PDF",file:"Chapter 5 Short Note.pdf" },
        { id: 8, name: "Chapter2", type: "PDF",file:"Chapter 5 Short Note.pdf" },
        { id: 9, name: "Chapter3", type: "PDF" ,file:"Chapter 5 Short Note.pdf"},
        { id: 10, name: "Chapter4", type: "PDF" ,file:"Chapter 5 Short Note.pdf"},
      ],
    },
  ]);

  const handleDownload = (materialId, fileName) => {
    const fileUrl = `/resource/${fileName}`; // Assuming the resource folder is in the public directory
    downloadFile(fileUrl, fileName);
  };

  const downloadFile = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  const [alwaysOpen, setAlwaysOpen] = React.useState(true);

  return (
    <RootLayout>
      <StudentHeader />
      <Accordion open={alwaysOpen} className="mx-16">
        {courses.map((course) => (
          <AccordionBody key={course.id}>
            <AccordionHeader>{course.name}</AccordionHeader>
            <div className="px-4 py-2 grid grid-cols-2 gap-4 w-[90%]">
              {course.materialsData.map((material) => (
                <div
                  key={material.id}
                  className="border rounded p-2 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">{material.name}</p>
                    <p>{material.type}</p>
                  </div>
                  <IconButton
                    className="bg-primary text-white rounded"
                    onClick={() => handleDownload(material.id, material.file)}
                  >
                    <FaDownload />
                  </IconButton>
                </div>
              ))}
            </div>
          </AccordionBody>
        ))}
      </Accordion>
    </RootLayout>
  );
}

export default Resource;
