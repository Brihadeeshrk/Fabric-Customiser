import React from "react";
import { fabric } from "fabric";

export const fabricContext = React.createContext({
  canvas: undefined as fabric.Canvas | undefined,
  storeCanvas: (canvas: fabric.Canvas) => {},
  elementType: "",
  storeElementType: (type: string) => {},
  tab: "Products",
  switchTab: (tab: string) => {},
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
  const [tab, setTab] = React.useState("Products");

  const storeCanvas = (canvas: fabric.Canvas) => {
    setCanvas(canvas);
  };

  const storeElementType = (type: string) => {
    setElementType(type);
  };

  const switchTab = (tab: string) => {
    setTab(tab);
  };

  const value = {
    canvas,
    storeCanvas,
    elementType,
    storeElementType,
    tab,
    switchTab,
  };

  return (
    <fabricContext.Provider value={value}>{children}</fabricContext.Provider>
  );
};

export default FabricContextProvider;
