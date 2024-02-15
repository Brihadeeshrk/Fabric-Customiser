import { Icon, Text } from "@chakra-ui/react";
import React from "react";
import {
  AiOutlineShoppingCart,
  AiTwotoneCamera,
  AiOutlineCloudUpload,
  AiFillCloud,
  AiOutlineQrcode,
} from "react-icons/ai";
import { motion } from "framer-motion";
import { RxText } from "react-icons/rx";

interface TabsProps {
  currentTab: string;
  chooseTab: (tab: string) => void;
}

export interface Tab {
  title: string;
  icon: typeof Icon.arguments;
  onClick?: () => void;
}

const TabOptions: Array<Tab> = [
  // {
  //   title: "Products",
  //   icon: AiOutlineShoppingCart,
  // },
  // {
  //   title: "Assets",
  //   icon: AiTwotoneCamera,
  // },
  {
    title: "Upload Image",
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
    title: "Insert Text",
    icon: RxText,
  },
  // {
  //   title: "Word Cloud",
  //   icon: AiFillCloud,
  // },
];

const Tabs: React.FC<TabsProps> = ({ chooseTab, currentTab }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="space-y-8">
      {TabOptions.map((tab) => (
        <div
          className="flex-col md:flex justify-center items-center relative"
          key={tab.title}
          onClick={() => chooseTab(tab.title)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            style={{
              transition: "background-color 0.2s",
            }}
          >
            <Icon
              fontSize={34}
              as={tab.icon}
              color={currentTab === tab.title ? "blue.500" : "gray.500"}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="label"
          >
            <p
              className={`font-semibold text-sm md:text-md text-center cursor-pointer ${
                currentTab === tab.title ? "text-blue-500" : "text-gray-500"
              }`}
            >
              {tab.title}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
