import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MdPrint } from "react-icons/md";
import { GiSewingNeedle } from "react-icons/gi";
import { fabricContext } from "@/store/context";

interface buttonActions {
  icon: typeof Icon.arguments;
  text: string;
}

const Customisation: React.FC = () => {
  const { customisationType, storeCustomisationType } =
    useContext(fabricContext);

  const buttons: Array<buttonActions> = [
    {
      icon: GiSewingNeedle,
      text: "Embroidery",
    },
    {
      icon: MdPrint,
      text: "Print",
    },
  ];

  useEffect(() => {
    if (!customisationType) {
      const storedCustomisationType = localStorage.getItem("customisationType");
      if (storedCustomisationType) {
        storeCustomisationType(storedCustomisationType);
      }
    }
  }, [customisationType, storeCustomisationType]);

  const handleButtonClick = (type: string) => {
    storeCustomisationType(type);
    localStorage.setItem("customisationType", type);
  };

  return (
    <Flex p={2} width="100%" className="bg-off-white rounded-md">
      <Flex
        p={2}
        align="center"
        justify="space-evenly"
        width="100%"
        className="bg-primary-blue space-x-1 rounded-md"
      >
        {buttons.map((button) => (
          <Button
            key={button.text}
            display="flex"
            alignItems={"center"}
            bg={customisationType === button.text ? "white" : "transparent"}
            color={customisationType === button.text ? "text.100" : "white"}
            onClick={() => handleButtonClick(button.text)}
            _hover={{ opacity: 0.9 }}
            p={{ xl: 7 }}
            justifyContent={"space-evenly"}
            className="space-x-1"
          >
            <Icon
              as={button.icon}
              fontSize={18}
              color={
                customisationType === button.text ? "primary.100" : "white"
              }
            />

            <Text fontSize={{ base: "12px", xl: "18px" }}>{button.text}</Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default Customisation;
