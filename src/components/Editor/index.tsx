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
      <div className="w-1/4 p-3 h-auto">
        <Menu />
      </div>

      <div className="flex flex-col w-3/4 p-3 space-y-5">
        <Customisation />

        {customisationType && (
          <>
            <TopMenu />
            <div className="flex space-x-5 mt-5">
              <div className="p-5 w-[60%] bg-fabric-container">
                <FabricCanvas />
              </div>
              <div className=" w-[40%] ">
                <DesignPosition />
              </div>
            </div>

            <Notes />

            <div className="w-11/12 flex justify-end">
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
