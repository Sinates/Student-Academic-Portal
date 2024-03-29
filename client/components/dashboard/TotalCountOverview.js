import { PiUsersThree } from "react-icons/pi";
import { IoBulbOutline, IoFolderOpenOutline } from "react-icons/io5";
import { MdOutlineTopic } from "react-icons/md";
import CountUp from "react-countup";
import {
  useGetCoursesQuery,
  useGetTeachersQuery,
  useGetStudentsQuery,
  useGetBatchesQuery,
} from "@/api/api-slice";
import { useEffect,useState } from "react";
// import { useGetAllTotalCountsQuery } from "@/api/dashboard-api";

const Stats = () => {
  const { data: student,isError } = useGetStudentsQuery();
  //console.log(student,isError)
  const { data: teacher } = useGetTeachersQuery();
  const { data: course } = useGetCoursesQuery();
  const { data: batch } = useGetBatchesQuery();
  const [stat,setStat] = useState({students:0,teachers:0,courses:0,batches:0});
  useEffect(() => {
    setStat({students:student?.students?.length ,teachers:teacher?.length,courses:course?.length,batches:batch?.batches?.length});
   console.log(student,teacher,course)
  }, [student, teacher, course]);
  // const { data } = useGetAllTotalCountsQuery();
  const stats = [
    {
      icon: <PiUsersThree className="h-7 w-7 text-primary" />,
      title: "Total Registered Students",
      // subtitle: data?.data.usersCount,
      subtitle: stat.students,
    },
    {
      icon: <IoBulbOutline className="h-6 w-6 text-primary" />,
      title: "Total Courses",
      // subtitle: data?.data.totalInsightCount,
      subtitle: stat.courses,
    },
    {
      icon: <MdOutlineTopic className="h-6 w-6 text-primary" />,
      title: "Total Teachers",
      // subtitle: data?.data.totalTopicCount,
      subtitle:stat.teachers,
    },
    {
      icon: <IoFolderOpenOutline className="h-6 w-6 text-primary" />,
      title: "Total Batches",
      // subtitle: data?.data.totalCategoryCount,
      subtitle: stat.batches,
    },
  ];

  return (
    <div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 text-secondary lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`!z-5 relative flex rounded-[20px] bg-white h-28 bg-clip-border shadow-3xl shadow-shadow-500 dark:shadow-none dark:bg-navy-800 dark:text-white flex-row flex-grow items-center rounded-[20px]`}
          >
            <div className="ml-[18px] flex rounded-full w-auto flex-row items-center">
              <div className="rounded-full bg-[#B8D5FF] bg-opacity-50 p-3 dark:bg-navy-700">
                <span className="flex items-center text-white">
                  {stat.icon}
                </span>
              </div>
            </div>
            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
              <h4 className="text-3xl font-extrabold text-navy-700">
                <CountUp
                  start={0}
                  end={stat.subtitle || 0}
                  duration={2.5}
                  delay={0}
                />
              </h4>
              <p className="font-dm text-xs font-normal mt-2 text-gray-400">
                {stat.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
