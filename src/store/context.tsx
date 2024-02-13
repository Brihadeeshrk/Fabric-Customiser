import React from "react";
import { fabric } from "fabric";

export const fabricContext = React.createContext({
  canvas: undefined as fabric.Canvas | undefined,
  storeCanvas: (canvas: fabric.Canvas) => {},
  elementType: "",
  storeElementType: (type: string) => {},
  tab: "Upload Image",
  switchTab: (tab: string) => {},
  currentDesignPosition: "",
  storeCurrentDesignPosition: (position: string) => {},
  customisationType: "",
  storeCustomisationType: (type: string) => {},
  currentTshirt: "/assets/tshirt.png",
  storeCurrentTshirt: (tshirt: string) => {},
});

interface fabricContextProviderProps {
  children: React.ReactNode;
}

const FabricContextProvider: React.FC<fabricContextProviderProps> = ({
  children,
}) => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas | undefined>(
    undefined
  );
  const [elementType, setElementType] = React.useState("");
  const [tab, setTab] = React.useState("Upload Image");
  const [currentDesignPosition, setCurrentDesignPosition] =
    React.useState<string>("Front Left Chest");
  const [customisationType, setCustomisationType] = React.useState("");
  const [currentTshirt, setCurrentTshirt] =
    React.useState<string>("/assets/tshirt.png");

  const storeCanvas = (canvas: fabric.Canvas) => {
    setCanvas(canvas);
  };

  const storeElementType = (type: string) => {
    setElementType(type);
  };

  const switchTab = (tab: string) => {
    setTab(tab);
  };

  const storeCurrentDesignPosition = (position: string) => {
    setCurrentDesignPosition(position);
  };

  const storeCustomisationType = (type: string) => {
    setCustomisationType(type);
  };

  const storeCurrentTshirt = (tshirt: string) => {
    setCurrentTshirt(tshirt);
  };

  const value = {
    canvas,
    storeCanvas,
    elementType,
    storeElementType,
    tab,
    switchTab,
    currentDesignPosition,
    storeCurrentDesignPosition,
    customisationType,
    storeCustomisationType,
    currentTshirt,
    storeCurrentTshirt,
  };

  return (
    <fabricContext.Provider value={value}>{children}</fabricContext.Provider>
  );
};

export default FabricContextProvider;
