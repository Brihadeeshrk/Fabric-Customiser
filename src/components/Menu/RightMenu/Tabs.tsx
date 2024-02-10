import React from "react";
import { IoIosSave, IoIosPrint } from "react-icons/io";
import { IoDownloadSharp } from "react-icons/io5";
import { FaUndo, FaRedo } from "react-icons/fa";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { Tab } from "../LeftMenu/Tabs";

const TabOptions: Array<Tab> = [
  {
    title: "Save",
    icon: IoIosSave,
    onClick: () => console.log("Save"),
  },
  {
    title: "Print",
    icon: IoIosPrint,
    onClick: () => console.log("Print"),
  },
  {
    title: "Download as PNG",
    icon: IoDownloadSharp,
    onClick: () => console.log("Download as PNG"),
  },
];

const ActionTabs: Array<Tab> = [
  {
    title: "Undo",
    icon: FaUndo,
    onClick: () => console.log("Undo"),
  },
  {
    title: "Redo",
    icon: FaRedo,
    onClick: () => console.log("Redo"),
  },
];

const Tabs: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-5 flex flex-col pt-10">
        {TabOptions.map((tab) => (
          <Tooltip label={tab.title} key={tab.title} placement="left">
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
      <div className="space-y-5 flex flex-col pt-10">
        {ActionTabs.map((tab) => (
          <Tooltip label={tab.title} key={tab.title} placement="left">
            <Button
              onClick={tab.onClick}
              border={"1px"}
              borderColor={"gray.300"}
              p={3}
              bg={"white"}
            >
              <Icon fontSize={20} as={tab.icon} />
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
export default Tabs;
