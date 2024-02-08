import { Icon } from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineShoppingCart,
  AiTwotoneCamera,
  AiOutlineCloudUpload,
  AiFillCloud,
  AiOutlineQrcode,
} from "react-icons/ai";
import { PiPencilSimpleDuotone } from "react-icons/pi";
import { RxText } from "react-icons/rx";

interface TabsProps {
  currentTab: string;
  chooseTab: (tab: string) => void;
}

interface Tab {
  title: string;
  icon: typeof Icon.arguments;
}

const TabOptions: Array<Tab> = [
  {
    title: "Products",
    icon: AiOutlineShoppingCart,
  },
  // {
  //   title: "Assets",
  //   icon: AiTwotoneCamera,
  // },
  {
    title: "Upload",
    icon: AiOutlineCloudUpload,
  },
  // {
  //   title: "QRCode",
  //   icon: AiOutlineQrcode,
  // },
  // {
  //   title: "Draw",
  //   icon: PiPencilSimpleDuotone,
  // },
  {
    title: "Text",
    icon: RxText,
  },
  // {
  //   title: "Word Cloud",
  //   icon: AiFillCloud,
  // },
];

const Tabs: React.FC<TabsProps> = ({ chooseTab, currentTab }) => {
  return (
    <div className="space-y-8">
      {TabOptions.map((tab) => (
        <div
          className="flex items-center"
          key={tab.title}
          onClick={() => chooseTab(tab.title)}
        >
          <Icon
            fontSize={34}
            as={tab.icon}
            color={currentTab === tab.title ? "blue.500" : "gray.500"}
          />
        </div>
      ))}
    </div>
  );
};
export default Tabs;
