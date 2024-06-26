import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { useRouter } from "next/router";
import { useApprovePendingTeachersMutation, useRejectPendingTeachersMutation } from "@/api/api-slice";

export default function PendingTeacherCard({ teacher }) {
  const router = useRouter();
  const [approveTeacher] = useApprovePendingTeachersMutation();
  const [removeTeacher] = useRejectPendingTeachersMutation();

  const handleApprove = (event, teacherId) => {
 
    approveTeacher(teacherId)
    event.stopPropagation();
  }
  const handleRemove = (event, teacherId) => {
    
    removeTeacher(teacherId)
    event.stopPropagation();
  }
  return (
    <Card
      color="#FFFFFF"
      shadow={true}
      className="w-full max-w-[26rem] max-h-52 mx- my-4"
      onClick={() => router.push(`/admin/teacher/${teacher._id}`)}
    >
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-4 flex items-center gap-4 pt-0 pb-4"
      >
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="blue-gray">
              {teacher.name}
            </Typography>
          </div>
          <Typography variant="subtitle2" color="blue-gray">
            {teacher.email}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-4 mx-4 p-0">
        <Typography variant="small" className="pb-5">
          ""
        </Typography>
        <div className="flex my-2 justify-end">
          <button className="bg-[#58A399] bg-opacity-10 text-[#58A399] text-sm px-4 py-2 rounded-md flex"  onClick={(e)=>handleApprove(e,teacher._id)}>
            <IoMdCheckmark size={18} /> <span className="ml-2">Accept</span>
          </button>
          <button className="bg-[#CB373D] bg-opacity-10 text-[#CB373D] text-sm px-2 py-2 rounded-md ml-4 flex" onClick={(e)=>handleRemove(e,teacher._id)}>
            <IoMdClose size={18} /> <span>Decline</span>
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
