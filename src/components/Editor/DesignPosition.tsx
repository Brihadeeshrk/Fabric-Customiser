import React, { useContext, useEffect } from "react";
import { fabricContext } from "@/store/context";
import { Image, Text } from "@chakra-ui/react";

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
type SavedPositions = {
  [key: string]: boolean;
};
const DesignPosition: React.FC = () => {
  const {
    storeCurrentDesignPosition,
    currentDesignPosition,
    storeCurrentTshirt,
  } = useContext(fabricContext);

  const [savedPositions, setSavedPositions] = React.useState<SavedPositions>(
    {}
  );

  useEffect(() => {
    const canvasData = JSON.parse(localStorage.getItem("canvas") || "{}");
    setSavedPositions(canvasData as SavedPositions);
  }, [currentDesignPosition]);

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

  const isPositionSaved = (position: string) => {
    return !!savedPositions[position];
  };

  return (
    <div className="w-[100%] p-3 bg-off-white rounded-md flex-col space-y-3">
      <p className="text-sm font-bold text-gray-600">
        Select a design position
      </p>
      <div className="flex items-center justify-between ">
        {designPositions.map((asset) => (
          <div
            className={`flex-col xl:p-2 rounded-md m-2 w-[100px] h-[150px] bg-[#fff] ${
              currentDesignPosition === asset.position
                ? "border-2 border-primary-blue"
                : "border border-gray-400"
            }`}
            onClick={() => handleDesignPositionSelection(asset.position)}
            key={asset.position}
          >
            <Text
              className={`flex h-[35%] ${
                currentDesignPosition === asset.position
                  ? "text-blue-500 font-bold"
                  : ""
              }`}
              color={"#2C514C"}
              fontSize={{ base: "10px", xl: "12px" }}
            >
              {asset.position}
            </Text>
            <div className=" flex flex-1 items-center justify-center   ">
              <div
                className={` flex flex-1 items-center justify-center rounded-full  ${
                  isPositionSaved(asset.position)
                    ? "bg-light-green"
                    : "bg-off-white"
                } `}
              >
                <Image
                  cursor={"pointer"}
                  src={asset.image}
                  alt="image"
                  width={{ base: 75, xl: 100 }}
                  p={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default DesignPosition;
