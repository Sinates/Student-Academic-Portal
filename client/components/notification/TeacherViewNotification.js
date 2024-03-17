import React, { useState, useEffect } from 'react';
import { Tabs, TabsHeader, TabsBody, TabPanel } from "@material-tailwind/react";
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
  ];

  const tabChangeHandler = (value) => {
    setActiveTab(value);
  };

  return (
    <div className="p-8">
      <Tabs value={activeTab} onChange={tabChangeHandler}>
        <TabsBody>
          {data2.find(data => data.value === activeTab)?.notifications.map(notification => (
            <div key={notification.id} className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center">
              <span className="text-sm">{notification.message}</span>
              <span className="text-xs text-gray-500 ml-auto">{notification.time}</span>
            </div>
          ))}
          {/* New row for notifications from Admin */}
          <div>
            <h1 className="text-lg font-semibold mb-4">Notifications from Admin</h1>
            {(data2.find(data => data.value === "adminMessages")?.notifications || []).map(notification => (
              <div key={notification.id} className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center">
                <span className="text-sm">{notification.message}</span>
                <span className="text-xs text-gray-500 ml-auto">{notification.time}</span>
              </div>
            ))}
          </div>
          {/* New row for messages */}
          <div className="bg-white p-4 rounded-md shadow-md mb-4 flex items-center">
            <span className="text-sm">New message from Admin</span>
            <span className="text-xs text-gray-500 ml-auto">{currentTime}</span>
          </div>
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default Notification;
