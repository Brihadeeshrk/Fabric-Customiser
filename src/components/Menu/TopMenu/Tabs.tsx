import React from "react";
import useMenuOps from "@/hooks/menuOps";
import { Button, Icon } from "@chakra-ui/react";
import {
  FaCopy,
  FaLock,
  FaLockOpen,
  FaPaste,
  FaRegTrashAlt,
} from "react-icons/fa";
import { IoIosPrint } from "react-icons/io";
import { IoDownloadSharp } from "react-icons/io5";
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
  ];

  return (
    <div className="flex space-x-8">
      <div className="space-x-5 flex">
        <div className="grid grid-cols-3 gap-2">
          {TabOptions.map((tab) => (
            <Button
              key={tab.title}
              onClick={tab.onClick}
              border={"1px"}
              borderColor={"gray.300"}
              p={{ base: 5, xl: 8 }}
              bg={"white"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              mb={2}
            >
              <Icon fontSize={{ base: 18, xl: 25 }} as={tab.icon} />
              <p className="text-xs xl:text-xl">{tab.title}</p>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-x-5 flex">
        <div className="grid grid-cols-2 gap-2">
          {OperationButtons.map((tab) => (
            <Button
              key={tab.title}
              onClick={tab.onClick}
              border={"1px"}
              borderColor={"gray.300"}
              p={{ base: 5, xl: 8 }}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              mb={2}
            >
              <Icon fontSize={{ base: 18, xl: 25 }} as={tab.icon} />
              <p className="text-xs xl:text-xl">{tab.title}</p>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
