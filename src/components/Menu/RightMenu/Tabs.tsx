import React, { useContext } from "react";
import { IoIosSave, IoIosPrint } from "react-icons/io";
import { IoDownloadSharp } from "react-icons/io5";
import { FaUndo, FaRedo } from "react-icons/fa";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { Tab } from "../LeftMenu/Tabs";

import useFabricOps from "@/hooks/fabricOps";
import { fabricContext } from "@/store/context";
import useMenuOps from "@/hooks/menuOps";

const Tabs: React.FC = () => {
  const { save, print, downloadAsPNG } = useMenuOps();
  const { undo, redo } = useFabricOps();
  const { canvas } = useContext(fabricContext);
  const ActionTabs: Array<Tab> = [
    {
      title: "Undo",
      icon: FaUndo,
      onClick: () => {
        if (canvas) {
          undo(canvas);
        }
      },
    },
    {
      title: "Redo",
      icon: FaRedo,
      onClick: () => {
        if (canvas) {
          redo(canvas);
        }
      },
    },
  ];

  const TabOptions: Array<Tab> = [
    {
      title: "Save",
      icon: IoIosSave,
      onClick: () => {
        if (canvas) {
          save(canvas);
        }
      },
    },
    {
      title: "Print",
      icon: IoIosPrint,
      onClick: () => {
        if (canvas) {
          print(canvas);
        }
      },
    },
    {
      title: "Download as PNG",
      icon: IoDownloadSharp,
      onClick: () => {
        if (canvas) {
          downloadAsPNG(canvas);
        }
      },
    },
  ];
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
