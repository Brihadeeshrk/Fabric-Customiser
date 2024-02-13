import { useContext, useEffect, useState } from "react";
import { fabricContext } from "@/store/context";
import { Image } from "@chakra-ui/react";
import CanvasPosition from "./CanvasPosition";

const FabricCanvas: React.FC = () => {
  const { currentDesignPosition, currentTshirt } = useContext(fabricContext);
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 100, height: 100 });
  const [canvasPosition, setCanvasPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const positionMapping: {
    [key: string]: { width: number; height: number; top: number; left: number };
  } = {
    "Front Left Chest": { width: 50, height: 50, top: 25, left: 51 },
    "Front Right Chest": { width: 50, height: 50, top: 25, left: 46 },
    "Front Center": { width: 125, height: 150, top: 22, left: 46 },
    "Left Sleeve": { width: 70, height: 40, top: 74, left: 48 },
    "Right Sleeve": { width: 70, height: 40, top: 74, left: 47.5 },
    "Back Neck": { width: 80, height: 30, top: 10, left: 47.5 },
    "Back Center": { width: 125, height: 150, top: 22, left: 46 },
  };

  useEffect(() => {
    if (currentDesignPosition) {
      const positionConfig = positionMapping[currentDesignPosition];
      console.log(positionConfig);
      if (positionConfig) {
        setCanvasSize({
          width: positionConfig.width,
          height: positionConfig.height,
        });
        setCanvasPosition({
          top: positionConfig.top,
          left: positionConfig.left,
        });
      }
    }
  }, [currentDesignPosition]);

  return (
    <div className="relative h-full flex">
      <div className="flex items-center justify-center w-full">
        <Image src={currentTshirt} height={300} width={300} alt="Tshirt" />
      </div>
      <div
        className="absolute "
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
