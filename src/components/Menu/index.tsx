import React from "react";
import Tabs from "./Tabs";
import Content from "./Content";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const [currentTab, setCurrentTab] = React.useState("Products");

  const chooseTab = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <div className="bg-white rounded-md p-3 shadow-lg flex">
        <div className="p-3 bg-gray-200 rounded-md">
          <Tabs chooseTab={chooseTab} currentTab={currentTab} />
        </div>
        <div className="w-full p-3 rounded-md">
          <Content currentTab={currentTab} />
        </div>
      </div>
    </>
  );
};
export default Menu;
