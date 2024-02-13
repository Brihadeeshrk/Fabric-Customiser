import { fabricContext } from "@/store/context";
import { Image } from "@chakra-ui/react";
import { fabric } from "fabric";
import React, { useContext, useEffect, useState } from "react";
const FabricCanvas: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const { storeCanvas, switchTab, currentTshirt } = useContext(fabricContext);

  useEffect(() => {
    const initCanvas = new fabric.Canvas("canvas", {
      height: 500,
      width: 500,
    });
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    const deleteImg = document.createElement("img");
    deleteImg.src =
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13l-1.41 1.41L12 13.41l-3.59 3.59L7 15l3.59-3.59L7 7.82 8.41 6.41 12 9.99l3.59-3.58L17 7.82l-3.59 3.59L17 15z" fill="red"/></svg>';
    deleteImg.onload = () => {
      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: -3,
        cursorStyle: "pointer",
        mouseUpHandler: (
          eventData: any,
          transform: fabric.Transform,
          x: number,
          y: number
        ): boolean => {
          const target = transform.target;
          const canvas = target.canvas;
          if (canvas && target) {
            canvas.remove(target);
            canvas.requestRenderAll();
            return true;
          }
          return false;
        },
        render: (
          ctx: CanvasRenderingContext2D,
          left: number,
          top: number,
          styleOverride: any,
          fabricObject: any
        ) => {
          const size = 20;
          ctx.save();
          ctx.translate(left, top);
          ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
          ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
          ctx.restore();
        },
      });
    };
    setCanvas(initCanvas);
    storeCanvas(initCanvas);

    initCanvas.on("mouse:down", onSelectionChange);
    initCanvas.on("selection:created", onSelectionChange);
    initCanvas.on("selection:updated", onSelectionChange);
    initCanvas.on("selection:cleared", onSelectionChange);

    function onSelectionChange(event: fabric.IEvent) {
      const activeObject = event.target;

      if (activeObject) {
        switch (activeObject.type) {
          case "image":
            switchTab("Upload Image");
            break;

          case "text":
            switchTab("Insert Text");
            break;

          default:
        }
      }
    }

    initCanvas.on("object:modified", (event: any) => {
      const modifiedObject = event.target;
      if (modifiedObject instanceof fabric.Text) {
        console.log(
          `Text has been resized to ${modifiedObject.width}x${modifiedObject.height} pixels`
        );
      }
    });

    return () => {
      initCanvas.dispose();
    };
  }, []);

  return (
    <>
      <div className="h-full flex justify-center items-center">
        <Image
          src={currentTshirt}
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
