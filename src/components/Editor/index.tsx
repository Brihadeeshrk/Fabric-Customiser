import { Box, Button, Container, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoIosSave } from "react-icons/io";
import FabricCanvas from "../Canvas";
import Menu from "../Menu/LeftMenu";
import TopMenu from "../Menu/TopMenu/TopMenu";
import Customisation from "./Customisation";
import DesignPosition from "./DesignPosition";
import Notes from "./Notes";
import { fabricContext } from "@/store/context";
import Header from "./Header";

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
  const { customisationType } = useContext(fabricContext);

  return (
    <Flex direction={"column"} width="100%">
      {/* Header */}
      <Header />
      <Container
        className="space-y-3"
        width="100%"
        maxW={{ base: "3xl", xl: "8xl" }}
      >
        {/* Action Buttons */}
        <Flex
          alignItems="center"
          justify={"flex-end"}
          width={"100%"}
          className="mt-3 space-x-3"
        >
          <Button
            p={3}
            bg={"primary.200"}
            color={"white"}
            display={"flex"}
            padding={5}
            borderRadius={20}
          >
            <Text fontSize={{ base: "12px", xl: "18px" }}>Cancel</Text>
          </Button>
          <Button
            p={3}
            bg={"primary.100"}
            color={"white"}
            display={"flex"}
            padding={5}
            borderRadius={20}
          >
            <Text fontSize={{ base: "12px", xl: "18px" }}>
              Save and go to Cart
            </Text>
          </Button>
        </Flex>

        {/* Customisation Option and Menu */}
        <Box p={2} border="1px" borderColor={"text-100"} className="rounded-lg">
          <Flex
            direction="column"
            width="30%"
            maxWidth="400px"
            className="space-y-5  rounded-md"
          >
            <Customisation />
            {/* <Menu /> */}
          </Flex>
        </Box>
      </Container>

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
