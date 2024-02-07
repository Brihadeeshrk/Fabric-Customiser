import React, { useContext } from "react";
import { fabric } from "fabric";
import { Image } from "@chakra-ui/react";
import useFabricOps from "@/hooks/fabricOps";
import { Button } from "../ui/button";
import { fabricContext } from "@/store/context";

type FabricCanvasProps = {};

const FabricCanvas: React.FC<FabricCanvasProps> = () => {
  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const { storeCanvas } = useContext(fabricContext);

  React.useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      height: 600,
      width: 600,
    });

    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    setCanvas(c);
    storeCanvas(c);

    return () => {
      c.dispose();
    };
  }, []);

  //   const addRect = (canvas?: fabric.Canvas) => {
  //     const rect = new fabric.Rect({
  //       height: 280,
  //       width: 200,
  //       stroke: "#2BEBC8",
  //     });
  //     canvas?.add(rect);
  //     canvas?.requestRenderAll();
  //   };

  const { addRect, addText } = useFabricOps();

  return (
    <>
      {/* <Button onClick={() => addRect(canvas)}>Rectangle</Button> */}
      <div className="h-full flex justify-center items-center">
        <Image
          src="/assets/tshirt.png"
          height={500}
          width={500}
          alt="Tshirt"
          className="absolute"
        />
        <canvas
          id="canvas"
          className="border-dashed border-2 border-red-500 h-full relative"
        ></canvas>
      </div>
    </>
  );
};
export default FabricCanvas;
