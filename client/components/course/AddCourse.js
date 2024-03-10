import React from "react";
import { Input, Typography, Checkbox, Button } from "@material-tailwind/react";

function AddCourse() {
  return (
    <div className="w-[70%]">
      <form className="mt-8 mb-2 w-full ">
        <div className="flex justify-around">
        <div className="">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Course Code
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-6"
     
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Course Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-6"
           
          />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Credit Hour
          </Typography>
          <Input
            type="number"
            size="lg"
          
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 mt-6"
        
          />
        </div>
        </div>
        <div className="mt-8 flex justify-end mr-10" >
          <Button   color="lightBlue" ripple="light">
            Add Course
          </Button>
          </div>
        
      </form>
    </div>
  );
}

export default AddCourse;
