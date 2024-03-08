import React from "react";
import SideBarNavigation from "../components/common/SideBarNavigation";

const RootLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ position: "fixed", top: 0, left: 0, bottom: 0 }}>
        <SideBarNavigation />
      </div>
      <div style={{ marginLeft: 250, flexGrow: 1 }}>
        <div className=" h-20 w-full mb-10 mt-4 rounded-3xl bg-primary px-14"></div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
