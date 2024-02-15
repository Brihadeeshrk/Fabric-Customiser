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
  const {
    storeCurrentDesignPosition,
    currentDesignPosition,
    storeCurrentTshirt,
  } = useContext(fabricContext);

  const handleDesignPositionSelection = (position: string) => {
    storeCurrentDesignPosition(position);
    if (position.includes("Back")) {
      storeCurrentTshirt("/assets/tshirt-back.png");
    } else {
      storeCurrentTshirt("/assets/tshirt.png");
    }

    if (position.includes("Left Sleeve")) {
      storeCurrentTshirt("/assets/tshirt-left.png");
    }
    if (position.includes("Right Sleeve")) {
      storeCurrentTshirt("/assets/tshirt-right.png");
    }
  };

  return (
    <div className="p-3 bg-gray-200 rounded-md flex-col space-y-3">
      <p className="text-sm font-bold text-gray-600">
        Select a design position
      </p>
      <div className="flex-col items-center justify-center space-y-3">
        {designPositions.map((asset) => (
          <div
            className={`flex items-center xl:p-2 rounded-md ${
              currentDesignPosition === asset.position
                ? "border-4 border-blue-500"
                : "border-2 border-gray-400"
            }`}
            onClick={() => handleDesignPositionSelection(asset.position)}
            key={asset.position}
          >
            <Image
              cursor={"pointer"}
              src={asset.image}
              alt="image"
              width={{ base: 75, xl: 100 }}
              p={3}
            />
            <p
              className={`transition-all text-left text-sm xl:text-xl text-gray-700 ${
                currentDesignPosition === asset.position
                  ? "text-blue-500 font-bold"
                  : ""
              }`}
            >
              {asset.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DesignPosition;
