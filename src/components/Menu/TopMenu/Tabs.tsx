import React from "react";

import useMenuOps from "@/hooks/menuOps";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { IoIosPrint, IoIosSave } from "react-icons/io";
import { IoDownloadSharp } from "react-icons/io5";
import {
  FaCopy,
  FaLock,
  FaLockOpen,
  FaPaste,
  FaRegTrashAlt,
} from "react-icons/fa";
import { LuFlipHorizontal2 } from "react-icons/lu";
import { Tab } from "../LeftMenu/Tabs";

const Tabs: React.FC = () => {
  const {
    copyObject,
    pasteObject,
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

  const OperationButtons: Array<Tab> = [
    {
      title: "Print",
      icon: IoIosPrint,
      onClick: () => {},
    },
    {
      title: "Download as PNG",
      icon: IoDownloadSharp,
      onClick: () => {},
    },
    {
      title: "Save and Proceed to Cart",
      icon: IoIosSave,
      onClick: () => {},
    },
  ];
  return (
    <div className="flex space-x-8">
      <div className="space-x-5 flex">
        {TabOptions.map((tab) => (
          <Button
            key={tab.title}
            onClick={tab.onClick}
            border={"1px"}
            borderColor={"gray.300"}
            p={3}
            bg={"white"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Icon fontSize={25} as={tab.icon} mr={3} />
            <p className="text-sm">{tab.title}</p>
          </Button>
        ))}

        <div className="space-x-5 flex">
          {OperationButtons.map((tab) => (
            <Button
              onClick={tab.onClick}
              border={"1px"}
              borderColor={"gray.300"}
              p={3}
              key={tab.title}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon fontSize={25} as={tab.icon} mr={3} />
              <p className="text-sm">{tab.title}</p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Tabs;
