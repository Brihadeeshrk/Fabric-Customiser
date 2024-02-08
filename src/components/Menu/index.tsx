import React from "react";
import Tabs from "./Tabs";
import Content from "./Content";
import { fabricContext } from "@/store/context";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const { elementType, tab, switchTab } = React.useContext(fabricContext);

  return (
    <>
      <div className="bg-white rounded-md p-3 shadow-lg flex h-[500px]">
        <div className="p-3 bg-gray-200 rounded-md">
          <Tabs chooseTab={switchTab} currentTab={tab} />
        </div>
        <div className="w-full p-3 rounded-md">
          <Content currentTab={tab} />
        </div>
      </div>
    </>
  );
};
export default Menu;
