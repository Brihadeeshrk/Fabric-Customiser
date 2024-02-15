import { useContext, useEffect, useState } from "react";
import { fabricContext } from "@/store/context";
import { Image } from "@chakra-ui/react";
import CanvasPosition from "./CanvasPosition";

const FabricCanvas: React.FC = () => {
  const { currentDesignPosition, currentTshirt } = useContext(fabricContext);
  const [canvasPosition, setCanvasPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const positionMapping: {
    [key: string]: { width: number; height: number; top: number; left: number };
  } = {
    "Front Left Chest": { width: 75, height: 75, top: 30, left: 52 },
    "Front Right Chest": { width: 75, height: 75, top: 30, left: 43 },
    "Front Center": { width: 200, height: 300, top: 25, left: 44 },
    "Left Sleeve": { width: 100, height: 50, top: 77, left: 47 },
    "Right Sleeve": { width: 100, height: 50, top: 77, left: 46.5 },
    "Back Neck": { width: 80, height: 30, top: 10, left: 47.5 },
    "Back Center": { width: 200, height: 300, top: 20, left: 43.5 },
  };

  useEffect(() => {
    if (currentDesignPosition) {
      const positionConfig = positionMapping[currentDesignPosition];

      if (positionConfig) {
        setCanvasPosition({
          top: positionConfig.top,
          left: positionConfig.left,
        });
      }
    }
  }, [currentDesignPosition]);

  return (
    <div className="relative flex">
      <div className="flex items-center justify-center w-full">
        <Image
          src={currentTshirt}
          height={{ base: 250, xl: 500 }}
          width={{ base: 250, xl: 500 }}
          alt="Tshirt"
        />
      </div>
      <div
        className={`absolute`}
        style={{
          top: `${canvasPosition.top}%`,
          left: `${canvasPosition.left}%`,
        }}
      >
        <CanvasPosition
          position={currentDesignPosition}
          width={positionMapping[currentDesignPosition].width}
          height={positionMapping[currentDesignPosition].height}
        />
      </div>
    </div>
  );
};

export default FabricCanvas;
