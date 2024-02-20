import { Flex, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxText } from "react-icons/rx";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import TextTab from "./Content/Text/TextTab";
import Upload from "./Content/Upload/Upload";

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
  {
    title: "Picture",
    icon: AiOutlineCloudUpload,
  },
  {
    title: "Text",
    icon: RxText,
  },
];

const MenuTabs: React.FC<TabsProps> = ({ chooseTab, currentTab }) => {
  return (
    <Flex width="100%" className="space-y-8">
      <Tabs position="relative" variant="unstyled" width="100%">
        <TabList width="100%">
          {TabOptions.map((tab) => (
            <Tab
              display={{ base: "flex-col", xl: "flex" }}
              width="49%"
              onClick={() => chooseTab(tab.title)}
              key={tab.title}
              className="space-y-1 xl:space-x-2"
            >
              <Icon
                fontSize={{ base: 18, xl: 25 }}
                as={tab.icon}
                color={currentTab === tab.title ? "primary.100" : "gray.500"}
              />
              <Text
                fontSize={{ base: 12, xl: 18 }}
                className={`${
                  currentTab === tab.title && "text-primary-blue font-semibold"
                }`}
              >
                {tab.title}
              </Text>
            </Tab>
          ))}
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="primary.100"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <Upload />
          </TabPanel>

          <TabPanel>
            <TextTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default MenuTabs;
