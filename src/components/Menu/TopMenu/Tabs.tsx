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
import useMenuOps from "@/hooks/menuOps";

const Tabs: React.FC = () => {
  const {
    copyObject,
    pasteObject,
    horizontalAlign,
    verticalAlign,
    flipObject,
    lockLayer,
    unlockLayer,
    emptyCanvas,
  } = useMenuOps();

  const TabOptions: Array<Tab> = [
    {
      title: "Copy",
      icon: FaCopy,
      onClick: () => copyObject(),
    },
    {
      title: "Paste",
      icon: FaPaste,
      onClick: () => pasteObject(),
    },
    {
      title: "Horizontal Align",
      icon: LuMoveHorizontal,
      onClick: () => horizontalAlign(),
    },
    {
      title: "Vertical Align",
      icon: LuMoveVertical,
      onClick: () => verticalAlign(),
    },
    {
      title: "Flip",
      icon: LuFlipHorizontal2,
      onClick: () => flipObject(),
    },
    {
      title: "Lock Layer",
      icon: FaLock,
      onClick: () => lockLayer(),
    },
    {
      title: "Unlock Layer",
      icon: FaLockOpen,
      onClick: () => unlockLayer(),
    },
    {
      title: "Empty Canvas",
      icon: FaRegTrashAlt,
      onClick: () => emptyCanvas(),
    },
  ];
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
