import React, { useContext } from "react";
import { fabricContext } from "@/store/context";
import { Image } from "@chakra-ui/react";

interface designPositionOptions {
  image: string;
  position: string;
}

const designPositions: Array<designPositionOptions> = [
  {
    image: "/assets/left-chest.png",
    position: "Front Left Chest",
  },
  {
    image: "/assets/right-chest.png",
    position: "Front Right Chest",
  },
  {
    image: "/assets/front.svg",
    position: "Front Center",
  },
  {
    image: "/assets/left-sleeve.png",
    position: "Left Sleeve",
  },
  {
    image: "/assets/right-sleeve.png",
    position: "Right Sleeve",
  },
  {
    image: "/assets/neck.svg",
    position: "Back Neck",
  },
  {
    image: "/assets/back.svg",
    position: "Back Center",
  },
];

const DesignPosition: React.FC = () => {
  const { storeCurrentDesignPosition, currentDesignPosition } =
    useContext(fabricContext);

  return (
    <div className="p-3 bg-gray-200 rounded-md flex-col space-y-3 w-11/12">
      <p className="text-sm font-bold text-gray-600">
        Select a design position
      </p>
      <div className="flex items-center justify-center space-x-5">
        {designPositions.map((asset) => (
          <div
            className={` w-[12%] border-2 p-2 ${
              currentDesignPosition === asset.position
                ? "border-blue-500"
                : "border-gray-400"
            }`}
            key={asset.position}
          >
            <p
              className={`transition-all text-center text-md text-gray-700 ${
                currentDesignPosition === asset.position
                  ? "text-blue-500 font-bold"
                  : ""
              }`}
            >
              {asset.position}
            </p>
            <Image
              onClick={() => storeCurrentDesignPosition(asset.position)}
              cursor={"pointer"}
              src={asset.image}
              alt="image"
              mr={5}
              p={3}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default DesignPosition;
