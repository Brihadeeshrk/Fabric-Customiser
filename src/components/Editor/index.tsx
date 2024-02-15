import { Button, Icon } from "@chakra-ui/react";
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
    <div className="flex">
      <div className="p-3 w-2/5 xl:w-1/5 min-w-[200px]">
        <Menu />
      </div>

      <div className="flex flex-col flex-grow p-3 space-y-5">
        <Customisation />

        {customisationType && (
          <>
            <TopMenu />

            <div className="flex space-x-5 mt-5 h-[35%]">
              <div className="p-5 w-[85%] bg-fabric-container">
                <FabricCanvas />
              </div>

              <div className="w-[15%] overflow-y-auto">
                <DesignPosition />
              </div>
            </div>

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
          </>
        )}
      </div>
    </div>
  );
};

export default Editor;
