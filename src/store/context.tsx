import React from "react";
import { fabric } from "fabric";

export const fabricContext = React.createContext({
  canvas: undefined as fabric.Canvas | undefined,
  storeCanvas: (canvas: fabric.Canvas) => {},
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

  const storeCanvas = (canvas: fabric.Canvas) => {
    setCanvas(canvas);
  };

  const value = {
    canvas,
    storeCanvas,
  };

  return (
    <fabricContext.Provider value={value}>{children}</fabricContext.Provider>
  );
};

export default FabricContextProvider;
