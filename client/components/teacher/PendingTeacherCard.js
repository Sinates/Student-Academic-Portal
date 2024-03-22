import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";

export default function PendingTeacherCard({ teacher }) {
  return (
    <Card
      color="#FFFFFF"
      shadow={true}
      className="w-full max-w-[26rem] max-h-52 mx- my-4"
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
          <button className="bg-[#58A399] bg-opacity-10 text-[#58A399] text-sm px-4 py-2 rounded-md flex">
            <IoMdCheckmark size={18} /> <span className="ml-2">Accept</span>
          </button>
          <button className="bg-[#CB373D] bg-opacity-10 text-[#CB373D] text-sm px-2 py-2 rounded-md ml-4 flex">
            <IoMdClose size={18} /> <span>Decline</span>
          </button>
        </div>
      </CardBody>
    </Card>
  );
}
