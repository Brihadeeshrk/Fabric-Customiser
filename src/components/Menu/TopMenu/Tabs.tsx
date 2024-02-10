import React from "react";

import {
  FaCopy,
  FaPaste,
  FaRegTrashAlt,
  FaLock,
  FaLockOpen,
} from "react-icons/fa";
import {
  LuMoveHorizontal,
  LuMoveVertical,
  LuFlipHorizontal2,
} from "react-icons/lu";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { Tab } from "../LeftMenu/Tabs";

const TabOptions: Array<Tab> = [
  {
    title: "Copy",
    icon: FaCopy,
    onClick: () => {},
  },
  {
    title: "Paste",
    icon: FaPaste,
    onClick: () => {},
  },
  {
    title: "Horizontal Align",
    icon: LuMoveHorizontal,
    onClick: () => {},
  },
  {
    title: "Vertical Align",
    icon: LuMoveVertical,
    onClick: () => {},
  },
  {
    title: "Flip",
    icon: LuFlipHorizontal2,
    onClick: () => {},
  },
  {
    title: "Lock Layer",
    icon: FaLock,
    onClick: () => {},
  },
  {
    title: "Unlock Layer",
    icon: FaLockOpen,
    onClick: () => {},
  },
  {
    title: "Empty Canvas",
    icon: FaRegTrashAlt,
    onClick: () => {},
  },
];

const Tabs: React.FC = () => {
  return (
    <div className="flex space-x-8">
      <div className="space-x-5 flex">
        {TabOptions.map((tab) => (
          <Tooltip label={tab.title} key={tab.title} placement="bottom">
            <Button
              onClick={tab.onClick}
              border={"1px"}
              borderColor={"gray.300"}
              p={3}
              bg={"white"}
            >
              <Icon fontSize={25} as={tab.icon} />
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
export default Tabs;
