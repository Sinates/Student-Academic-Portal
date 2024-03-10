import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  import { IoMdClose } from "react-icons/io";
  import { FaCheck } from "react-icons/fa";
   

   
  export default function PendingTeacherCard() {
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
                Tania Andrew
              </Typography>
             
            </div>
            <Typography color="blue-gray">Frontend Lead @ Google</Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 mx-4 p-0">
          <Typography>
            &quot;I found solution to all my design needs from Creative Tim. I use
            them as a freelancer in my hobby projects for fun! And its really
            affordable, very humble guys !!!&quot;
          </Typography>
          <div className="flex justify-end">
          <div className="mx-4 flex items-center">
            <FaCheck color="green" size={20}/> <span className="ml-2">Accept</span>
            </div>
            <div className="flex ">
            <IoMdClose  color="red" size={25}/> <span>Decline</span>
            </div>

          </div>
        </CardBody>
      </Card>
    );
  }