import { fabricContext } from "@/store/context";
import { Box, Image } from "@chakra-ui/react";
import { fabric } from "fabric";
import React, { useContext, useEffect, useState } from "react";

const FabricCanvas: React.FC = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  const { storeCanvas, switchTab, currentDesignPosition } =
    useContext(fabricContext);

  useEffect(() => {
    const initCanvas = new fabric.Canvas("canvas", {
      height: 150,
      width: 150,
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
const positionMapping = {
  "Front Left Chest": { top: 25, left: 22, height: 50, width: 50 },
  "Front Right Chest": { top: 25, left: 10, height: 50, width: 50 },
  "Front Center": { top: 25, left: 13, height: 100, width: 100 },
  "Left Sleeve": { top: 0, left: 0, height: 80, width: 80 },
  "Right Sleeve": { top: 0, left: 0, height: 80, width: 80 },
  "Back Neck": { top: 0, left: 0, height: 100, width: 100 },
  "Back Center": { top: 25, left: 13, height: 100, width: 100 },
};

useEffect(() => {
  if (canvas && currentDesignPosition) {
    const positionConfig = positionMapping[currentDesignPosition as keyof typeof positionMapping];
    
    if (positionConfig) {
      setTop(positionConfig.top);
      setLeft(positionConfig.left);

      // Set canvas size
      canvas.setHeight(positionConfig.height);
      canvas.setWidth(positionConfig.width);
      canvas.renderAll();
    }
  }
}, [currentDesignPosition, canvas]);

  return (
    <>
     
    <div className=" relative h-full flex  ">
       <div>
         {currentDesignPosition}
         <Image
           src={"/assets/tshirt.png"}
          height={300}
          width={300}
          alt="Tshirt"
         // className="absolute"
        />
       </div>
        <div className="absolute  z-10" style={{
    top: `${top}%`, // Use state value for top
    left: `${left}%`, // Use state value for left
  }}>
           <canvas
          id="canvas"
          className="border-dashed border-2 border-red-500 h-full "
        ></canvas>
        </div>
      </div>
    </>
  );
};
export default FabricCanvas;
