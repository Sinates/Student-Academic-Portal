import React from "react";
import SideBarNavigation from "../components/common/SideBarNavigation";


const RootLayout = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <SideBarNavigation />
      <div style={{ flexGrow: 1 }}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
