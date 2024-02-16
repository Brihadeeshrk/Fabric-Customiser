import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoIosSave } from "react-icons/io";
import FabricCanvas from "../Canvas";
import Menu from "../Menu/LeftMenu";
import TopMenu from "../Menu/TopMenu/TopMenu";
import Customisation from "./Customisation";
import DesignPosition from "./DesignPosition";
import Notes from "./Notes";
import { fabricContext } from "@/store/context";

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
  const { customisationType } = useContext(fabricContext);

  return (
    <Flex width="100%" border="2px solid red">
      <Flex
        border="2px solid blue"
        direction="column"
        p={3}
        width="30%"
        maxWidth="400px"
        className="space-y-5"
      >
        <Customisation />
        {/* <Menu /> */}
      </Flex>

      {/* <Flex
        direction="column"
        flexGrow={1}
        p={3}
        className="space-y-5"
        width="80%"
      >
        {customisationType && (
          <Box>
            <DesignPosition />
            <TopMenu />

            <Flex mt={5} className="space-x-5 mt-5">
              <Flex className="p-5 w-[85%] bg-fabric-container">
                <FabricCanvas />
              </Flex>
            </Flex>

            <Notes />

            <div className="w-full flex justify-end">
              <Button
                p={3}
                bg={"#F6BE00"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                _hover={{ opacity: 0.7 }}
              >
                <Icon fontSize={25} as={IoIosSave} mr={3} />
                <p className="text-sm">Save and Go to Cart</p>
              </Button>
            </div>
          </Box>
        )}
      </Flex> */}
    </Flex>
  );
};

export default Editor;
