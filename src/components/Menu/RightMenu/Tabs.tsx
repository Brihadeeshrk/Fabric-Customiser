import { Button, Icon, Tooltip } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoIosPrint, IoIosSave } from "react-icons/io";
import { IoDownloadSharp } from "react-icons/io5";
import { Tab } from "../LeftMenu/Tabs";

import useMenuOps from "@/hooks/menuOps";
import { fabricContext } from "@/store/context";

const Tabs: React.FC = () => {
  const { print, downloadAsPNG } = useMenuOps();
  const { canvas } = useContext(fabricContext);

  const TabOptions: Array<Tab> = [
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
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon fontSize={25} as={tab.icon} mr={3} />
              <p className="text-sm">{tab.title}</p>
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
export default Tabs;
