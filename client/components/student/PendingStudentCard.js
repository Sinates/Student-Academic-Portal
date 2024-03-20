import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { IoMdClose } from "react-icons/io";
  import { FaCheck } from "react-icons/fa";
  import {moveStudentToStudents} from "../../data/student";

   
  export default function PendingStudentCard({student}) {
    return (
      <Card color="transparent" shadow={true} className="w-full max-w-[26rem] mx- my-4">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-4 flex items-center gap-4 pt-0 pb-8"
        >
        
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
              {  student.fullName}
              </Typography>
             
            </div>
            <Typography color="blue-gray">{student.department}</Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 mx-4 p-0">
          <Typography>
            &quot;{student.aboutMe} !!!&quot;
          </Typography>
          <div className="flex justify-end">
            <button className="bg-[#58A399] bg-opacity-10 text-[#58A399] text-sm px-4 py-2 rounded-md flex" onClick={()=>moveStudentToStudents(student.id)}>
              <FaCheck size={18} /> <span className="ml-2">Accept</span>
              
            </button>
            <button className="bg-[#CB373D] bg-opacity-10 text-[#CB373D] text-sm px-2 py-2 rounded-md ml-4 flex">
              <IoMdClose size={18} /> <span>Decline</span>
            </button>
          </div>
        </CardBody>
      </Card>
    );
  }