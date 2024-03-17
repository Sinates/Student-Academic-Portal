import TeacherList from '@/components/teacher/TeacherList'
import RootLayout from '@/layouts/RootLayout'
import TopHeader from '@/components/common/Header';
import React from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import PendingTeacherList from '@/components/teacher/PendingTeacherList';

function Teacher() {
  const [activeTab, setActiveTab] = React.useState("currents");
  const data = [
    {
      label: "Current Teachers",
      value: "current",
      desc: <TeacherList/>,
    },
    {
      label: "Pending Teachers",
      value: "pending",
      desc: <PendingTeacherList/>,
    },
  ]
  return (
    <RootLayout>
      <TopHeader title={"Teacher"}/>
        <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900 font-bold" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>

    </RootLayout>
  )
}

export default Teacher;
