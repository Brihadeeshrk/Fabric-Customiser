import { Button, Icon } from "@chakra-ui/react";
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
      icon: MdPrint,
      text: "Print",
    },
    {
      icon: GiSewingNeedle,
      text: "Embroidery",
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
    <div className="p-3 bg-gray-200 rounded-md flex-col space-y-3">
      <p className="text-sm font-bold text-gray-600">Type of Customisation</p>
      <div className="flex w-1/2 space-x-3">
        {buttons.map((button) => (
          <Button
            key={button.text}
            display="flex"
            bg={customisationType === button.text ? "#F6BE00" : "white"}
            className="w-1/2"
            onClick={() => handleButtonClick(button.text)}
            _hover={{ opacity: 0.7 }}
          >
            <Icon as={button.icon} fontSize={25} mr={3} />
            {button.text}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Customisation;
