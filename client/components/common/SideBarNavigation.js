import {
  RiCheckboxBlankCircleFill,
  RiGroupLine,
  RiMenuFoldLine,
} from "react-icons/ri";
import {
  IoFolderOpenOutline,
  IoBulbOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdAutoGraph, MdOutlineTopic, MdOutlineQuiz } from "react-icons/md";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { AiOutlineMenuFold, AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaidIcon from "@mui/icons-material/Paid";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ChecklistIcon from "@mui/icons-material/Checklist";
import {getUserData} from "../../utils/sessions";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBarNav() {
  
  let role = getUserData().role;

  const router = useRouter();
  const paths = router.pathname.split("/");
  const map = useMemo(() => new Map(), []);

  map.set("dashboard", 1);
  map.set("course", 2);
  map.set("student", 3);
  map.set("payment", 5);

  const [activeTab, setActiveTab] = useState(map.get(paths[1]));
  const [isNavOpen, setIsNavOpen] = useState(true);

  useEffect(() => {
    setActiveTab(map.get(paths[1]));
  }, [paths, map]);

  let navigation = [];


  if (role == "Teacher")
    navigation = [
      {
        name: "Dashboard",
        i: 1,
        icon: MdAutoGraph,
        link: "/teachers/dashboard",
      },
      {
        name: "Upload",
        i: 2,
        icon: FileUploadIcon,
        link: "/teachers/upload",
      },
      {
        name: "Change Request",
        i: 3,
        icon: ChangeCircleIcon,
        link: "/teachers/gradeAttendanceChange",
      },
      {
        name: "Notification",
        i: 4,
        icon: NotificationsActiveIcon,
        link: "/teachers/notification",
      },
      {
        name: "Push notification",
        i: 5,
        icon: NotificationAddIcon,
        link: "/teachers/pushNotification",
      },

      {
        name: "Payments",
        i: 6,
        icon: MdOutlineTopic,
        link: "/student/payments",
      },
      {
        name: "Grade change requests",
        i: 7,
        icon: IoFolderOpenOutline,
        link: "/teacher/gradeChangeRequests",
      },
    ];
  else if (role == "Student")
    navigation = [
      {
        name: "Dashboard",
        i: 1,
        icon: MdAutoGraph,
        link: "/students/Dashboard",
      },
      {
        name: "Grade Change",
        i: 2,
        icon: RiGroupLine,
        link: "/students/GradeChange",
      },
      {
        name: "Resource", // Add the new item for student navigation
        i: 3,
        icon: IoFolderOpenOutline,
        link: "/students/Resource",
      },
      {
        name: "Grade Report",
        i: 4,
        icon: AssignmentIcon,
        link: "/students/GradeReport",
      },
      {
        name: "Payments",
        i: 5,
        icon: PaidIcon,
        link: "/students/payment",
      },
      {
        name: "notifications",
        i: 6,
        icon: NotificationAddIcon,
        link: "/students/notification",
      },

      {
        name: "Course List",
        i: 7,
        icon: ChecklistIcon,
        link: "/students/CourseList",
      },
    ];
  else
    navigation = [
      { name: "Dashboard", i: 1, icon: MdAutoGraph, link: "/admin/dashboard" },
      {
        name: "Courses",
        i: 2,
        icon: RiGroupLine,
        link: "/admin/course",
      },
      {
        name: "Students",
        i: 3,
        icon: IoFolderOpenOutline,
        link: "/admin/student",
      },
      {
        name: "Teachers",
        i: 4,
        icon: MdOutlineTopic,
        link: "/admin/teacher",
      },
      { name: "Payments", i: 5, icon: MdOutlineTopic, link: "/admin/payment" },

      {
        name: "Assign course",
        i: 6,
        icon: AssignmentOutlinedIcon,
        link: "/admin/Assigncourse",
      },
    ];

  const SetActiveMenuTab = (tab, link) => {
    router.push(link);
  };

  useEffect(() => {
    setActiveTab(map.get(paths[1]));
  }, [map, paths]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1290) {
        setIsNavOpen(false);
      } else {
        setIsNavOpen(true);
      }
    });
  }, []);

  return (
    <div
      className={classNames(
        isNavOpen ? "w-[280px]" : "w-16",
        "h-screen grid grid-cols-12"
      )}
    >
      <div
        className={classNames(
          isNavOpen ? "" : "hidden",
          "bg-white flex col-span-11 flex-col gap-y-5 shadow-gray-300 shadow-2xl h-screen rounded-r-2xl"
        )}
      >
        <div className="flex h-24 min-h-24 items-center bg-primary rounded-bl-xl rounded-tr-xl"></div>

        <nav className="flex flex-1 flex-col px-6 bg-white overflow-scroll no-scrollbar rounded-br-xl pt-9">
          <ul role="list" className="flex flex-1 flex-col">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item, i) => (
                  <li key={i} className="h-16 rounded-xl">
                    <button
                      onClick={() => SetActiveMenuTab(item.i, item.link)}
                      className={classNames(
                        activeTab == item.i
                          ? "bg-[#D2D5DB] text-primary"
                          : "text-secondary hover:bg-primary hover:text-white",
                        "group flex gap-x-3 rounded-xl p-2 pt-5 text-sm leading-6 font-medium h-full w-full"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          activeTab == item.i ? "text-white" : "text-primary",
                          "h-4 w-4 mt-1 ml-2"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                      {activeTab == item.i ? (
                        <span
                          className="ml-auto text-center text-xs font-medium leading-5 text-white ring-none pt-2 pr-2"
                          aria-hidden="true"
                        >
                          <RiCheckboxBlankCircleFill className="h-3 w-3 text-white" />
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            <li className="w-full mt-auto">
              <button
                onClick={() => signOut()}
                className="group flex gap-x-3 rounded-xl p-2 py-3 text-sm leading-6 font-medium h-full w-full"
              >
                <BiLogOut className="h-4 w-4 text-primary mt-1 ml-0.5" />
                <span
                  className="mx-3 text-secondary font-medium"
                  aria-hidden="true"
                >
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="col-span-1">
        <button
          onClick={() => setIsNavOpen(!isNavOpen)}
          className={classNames(
            isNavOpen ? "-ml-4 mt-20" : "ml-3 mt-7 ring-2 ring-primary",
            "text-center h-9 w-9 rounded-full border-2 border-white bg-primary text-xs font-medium leading-5 text-white ring-none"
          )}
          aria-hidden="true"
        >
          {isNavOpen ? (
            <AiOutlineMenuFold className="h-5 w-5 ml-1.5 text-white" />
          ) : (
            <AiOutlineMenu className="h-5 w-5 ml-1.5 px-0.5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}
