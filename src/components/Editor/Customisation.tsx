import { Button, Flex, Icon } from "@chakra-ui/react";
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
    <Flex width="100%" className="bg-primary-blue rounded-md">
      <Flex width="100%" className="space-x-2">
        {buttons.map((button) => (
          <Button
            key={button.text}
            display="flex"
            bg={customisationType === button.text ? "white" : "transparent"}
            color={customisationType === button.text ? "text.100" : "white"}
            onClick={() => handleButtonClick(button.text)}
            _hover={{ opacity: 0.9 }}
            p={7}
          >
            <Icon
              as={button.icon}
              fontSize={{ base: 20, xl: 25 }}
              mr={3}
              color={
                customisationType === button.text ? "primary.100" : "white"
              }
            />
            <p className="text-xs xl:text-xl">{button.text}</p>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default Customisation;
