import React, { useState, useEffect } from 'react';
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { FaTrash } from "react-icons/fa";

function Notification({ open, handler }) {
  const [activeTab, setActiveTab] = useState("admin");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const data1 = [
    {
      label: "Admin",
      value: "admin",
    },
    {
      label: "Teacher",
      value: "teacher",
    },
  ];

  const data2 = [
    {
      label: "Admin Messages",
      value: "adminMessages",
      notifications: [
        { id: 1, message: "Notification 1 for Admin", time: "10:00 AM" },
        { id: 2, message: "Notification 2 for Admin", time: "11:00 AM"  },
        
      ],
    },
    {
      label: "Teacher Messages",
      value: "teacherMessages",
      notifications: [
        { id: 3, message: "Notification 1 for Teacher", time: "12:00 PM" },
        { id: 4, message: "Notification 2 for Teacher", time: "1:00 PM" },
      ],
    },
  ];

  const tabChangeHandler = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="p-8">
      <Tabs value={activeTab} onChange={tabChangeHandler}>
        <TabsHeader>
          {data1.map((item, index) => (
            <Tab key={index} value={item.value}>
              {item.label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data1.map((item, index) => (
            <TabPanel key={index} value={item.value}>
              <div>
                <h1 className="text-lg font-semibold mb-4">Notifications from {item.label}</h1>
                <div className="grid gap-4">
                  {(data2.find(data => data.value === activeTab)?.notifications || []).map(notification => (
                    <div key={notification.id} className="flex items-center bg-gray-100 p-4 rounded-md border border-gray-300">
                      <span className="text-sm">{notification.message}</span>
                      <span className="text-xs text-gray-500 ml-auto">{notification.time}</span>
                    </div>
                  ))}
                  {/* New row for messages */}
                  <div className="flex items-center bg-gray-100 p-4 rounded-md border border-gray-300">
                    <span className="text-sm">New message from {item.label}</span>
                    <span className="text-xs text-gray-500 ml-auto">{currentTime}</span>
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Notification;
