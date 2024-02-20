import { fabricContext } from "@/store/context";
import React from "react";

import { Flex } from "@chakra-ui/react";
import MenuTabs from "./Tabs";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const { tab, switchTab } = React.useContext(fabricContext);

  return (
    <>
      <Flex
        border="1px solid red"
        className="bg-off-white h-2/3 rounded-md shadow-lg flex-col"
      >
        <Flex width="100%" className="p-3 rounded-md">
          <MenuTabs chooseTab={switchTab} currentTab={tab} />
        </Flex>
      </Flex>
    </>
  );
};
export default Menu;
