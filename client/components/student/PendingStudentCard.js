import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { IoMdCheckmark ,IoMdClose} from "react-icons/io";
import { useApprovePendingStudentsMutation, useRejectPendingStudentsMutation} from "@/api/api-slice";

export default function PendingStudentCard({student}) {
  const [approveStudent] = useApprovePendingStudentsMutation();
  const [removeStudent] = useRejectPendingStudentsMutation();

  return (
    <Card color="#FFFFFF" shadow={true} className="w-full max-w-[26rem] mx- my-4">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-4 flex items-center gap-4 pt-0 pb-4"
      >
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h6" color="blue-gray">
            { student.name }
            </Typography>
          </div>
          <Typography variant="subtitle2" color="blue-gray">{student.department}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-4 mx-4 p-0">
        <Typography variant="small" className="pb-5">
          "{student.aboutYou}"
        </Typography>
        <div className="flex my-2 justify-end">
          <button className="bg-[#58A399] bg-opacity-10 text-[#58A399] text-sm px-4 py-2 rounded-md flex" onClick={()=>approveStudent({data:{id:student.id}})}>
            <IoMdCheckmark size={18} /> <span className="ml-2">Accept</span>
          </button>
          <button className="bg-[#CB373D] bg-opacity-10 text-[#CB373D] text-sm px-2 py-2 rounded-md ml-4 flex"  onClick={()=>removeStudent({data:{id:student.id}})}>
            <IoMdClose size={18} /> <span>Decline</span>
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
