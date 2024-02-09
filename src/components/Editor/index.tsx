import { fabricContext } from "@/store/context";
import { Image } from "@chakra-ui/react";
import React, { useContext } from "react";
import FabricCanvas from "../Canvas";
import Menu from "../Menu";

interface EditorProps {}

const imageAssets: Array<string> = [
  "/assets/tshirt.png",
  "/assets/tshirt-back.png",
  "/assets/tshirt-side.png",
];

const Editor: React.FC<EditorProps> = () => {
  const { storeCurrentTshirt, currentTshirt } = useContext(fabricContext);
  return (
    <div className="flex">
      <div className="w-1/4 p-3">
        <Menu />
      </div>

      <div className="flex flex-col w-3/4 p-3">
        <div className="bg-fabric-container h-full">
          <FabricCanvas />
        </div>
        <div className="flex items-center justify-center mt-3">
          {imageAssets.map((asset) => (
            <Image
              onClick={() => storeCurrentTshirt(asset)}
              key={asset}
              src={asset}
              alt="image"
              width="10%"
              mr={5}
              p={3}
              border={currentTshirt === asset ? "2px" : "1px"}
              borderColor={currentTshirt === asset ? "blue.500" : "gray.300"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Editor;
