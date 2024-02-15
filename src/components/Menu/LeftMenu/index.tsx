import { fabricContext } from "@/store/context";
import { AnimatePresence } from "framer-motion";
import React from "react";
import Content from "./Content";
import Tabs from "./Tabs";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const { tab, switchTab } = React.useContext(fabricContext);

  return (
    <>
      <div className="bg-white h-2/3 rounded-md shadow-lg flex">
        <AnimatePresence>
          <div className="p-3 w-[25% md:w-[15%]] bg-gray-200 rounded-md">
            <Tabs chooseTab={switchTab} currentTab={tab} />
          </div>
        </AnimatePresence>
        <div className="w-full p-3 rounded-md">
          <Content currentTab={tab} />
        </div>
      </div>
    </>
  );
};
export default Menu;
