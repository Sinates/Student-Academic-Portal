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
import { AiOutlineMenuFold, AiOutlineMenu } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";


function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SideBarNav() {
    

    let role = "Super Admin";

  
    const router = useRouter();
    const paths = router.pathname.split("/");
    const map = useMemo(() => new Map(), []);

    if (role == "Super Admin" || role == "Admin") map.set("dashboard", 1);
    if (role == "Super Admin" || role == "Admin") map.set("course", 2);
    map.set("category", 3);
    map.set("topic", 4);
    map.set("insights", 5);
    map.set("quiz", 6);
    map.set("settings", 7);

    const [activeTab, setActiveTab] = useState(map.get(paths[1]));
    const [isNavOpen, setIsNavOpen] = useState(true);

    useEffect(() => {
        setActiveTab(map.get(paths[1]));
    }, [paths, map]);

    let navigation = [];

    if (role == "Admin")
        navigation = [
            { name: "Dashboard", i: 1, icon: MdAutoGraph, link: "/dashboard" },
            {
                name: "Courses",
                i: 2,
                icon: RiGroupLine,
                link: "/courses",
            },
            {
                name: "Students",
                i: 3,
                icon: IoFolderOpenOutline,
                link: "/students",
            },
            { name: "Payments", i: 4, icon: MdOutlineTopic, link: "/payments" },

        ];
    else if (role == "Teacher")
    navigation = [
        { name: "Dashboard", i: 1, icon: MdAutoGraph, link: "/dashboard" },
        {
            name: "Courses",
            i: 2,
            icon: RiGroupLine,
            link: "/courses",
        },
        {
            name: "Students",
            i: 3,
            icon: IoFolderOpenOutline,
            link: "/students",
        },
        { name: "Payments", i: 4, icon: MdOutlineTopic, link: "/payments" },

    ];
    else
    navigation = [
        { name: "Dashboard", i: 1, icon: MdAutoGraph, link: "/dashboard" },
        {
            name: "Courses",
            i: 2,
            icon: RiGroupLine,
            link: "/course",
        },
        {
            name: "Students",
            i: 3,
            icon: IoFolderOpenOutline,
            link: "/student",
        },
        { name: "Payments", i: 4, icon: MdOutlineTopic, link: "/payment" },

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
                <div className="flex h-24 min-h-24 items-center bg-primary rounded-bl-xl rounded-tr-xl">
                 
                </div>

                <nav className="flex flex-1 flex-col px-6 bg-white overflow-scroll no-scrollbar rounded-br-xl pt-9">
                    <ul role="list" className="flex flex-1 flex-col">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item ,i) => (
                                    <li key={i} className="h-16 rounded-xl">
                                        <button
                                            onClick={() =>
                                                SetActiveMenuTab(
                                                    item.i,
                                                    item.link
                                                )
                                            }
                                            className={classNames(
                                                activeTab == item.i
                                                    ? "bg-[#EBD7E7] text-primary"
                                                    : "text-secondary hover:bg-lightPrimaryBg",
                                                "group flex gap-x-3 rounded-xl p-2 pt-5 text-sm leading-6 font-medium h-full w-full"
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    activeTab == item.i
                                                        ? "text-primary"
                                                        : "text-primary",
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
                                                    <RiCheckboxBlankCircleFill className="h-3 w-3 text-primary" />
                                                </span>
                                            ) : null}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="w-full mt-auto">
                            <button
                                onClick={() => SetActiveMenuTab(7, "/settings")}
                                className={classNames(
                                    activeTab == 7
                                        ? "bg-[#EBD7E7] text-primary"
                                        : "text-secondary hover:bg-lightPrimaryBg",
                                    "group flex gap-x-3 rounded-xl p-2 py-3 text-sm leading-6 font-medium h-full w-full"
                                )}
                            >
                                <IoSettingsOutline className="h-4 w-4 text-primary mt-1 ml-1" />
                                <span
                                    className={classNames(
                                        activeTab == 7
                                            ? "text-primary"
                                            : "text-secondary",
                                        "mx-3 font-medium"
                                    )}
                                    aria-hidden="true"
                                >
                                    Settings
                                </span>
                            </button>
                        </li>
                        <li className="w-full mb-4">
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
                        isNavOpen
                            ? "-ml-4 mt-20"
                            : "ml-3 mt-7 ring-2 ring-primary",
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
