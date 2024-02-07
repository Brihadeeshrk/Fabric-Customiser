import React from "react";
import { fabric } from "fabric";

export const fabricContext = React.createContext({
  canvas: undefined as fabric.Canvas | undefined,
  storeCanvas: (canvas: fabric.Canvas) => {},
  elementType: "Products",
  storeElementType: (type: string) => {},
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

  const storeCanvas = (canvas: fabric.Canvas) => {
    setCanvas(canvas);
  };

  const storeElementType = (type: string) => {
    setElementType(type);
  };

  const value = {
    canvas,
    storeCanvas,
    elementType,
    storeElementType,
  };

  return (
    <fabricContext.Provider value={value}>{children}</fabricContext.Provider>
  );
};

export default FabricContextProvider;
