import React from "react";
import { fabric } from "fabric";

export const fabricContext = React.createContext({
  canvas: undefined as fabric.Canvas | undefined,
  storeCanvas: (canvas: fabric.Canvas) => {},
  elementType: "",
  storeElementType: (type: string) => {},
  tab: "Upload Image",
  switchTab: (tab: string) => {},
  currentTshirt: "",
  storeCurrentTshirt: (tshirt: string) => {},
  customisationType: "",
  storeCustomisationType: (type: string) => {},
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
  const [currentTshirt, setCurrentTshirt] =
    React.useState<string>("/assets/tshirt.png");
  const [customisationType, setCustomisationType] = React.useState("");

  const storeCanvas = (canvas: fabric.Canvas) => {
    setCanvas(canvas);
  };

  const storeElementType = (type: string) => {
    setElementType(type);
  };

  const switchTab = (tab: string) => {
    setTab(tab);
  };

  const storeCurrentTshirt = (tshirt: string) => {
    setCurrentTshirt(tshirt);
  };

  const storeCustomisationType = (type: string) => {
    setCustomisationType(type);
  };

  const value = {
    canvas,
    storeCanvas,
    elementType,
    storeElementType,
    tab,
    switchTab,
    currentTshirt,
    storeCurrentTshirt,
    customisationType,
    storeCustomisationType,
  };

  return (
    <fabricContext.Provider value={value}>{children}</fabricContext.Provider>
  );
};

export default FabricContextProvider;
