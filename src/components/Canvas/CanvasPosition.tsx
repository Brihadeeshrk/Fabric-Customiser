import useMenuOps from "@/hooks/menuOps";
import { fabricContext } from "@/store/context";

import { fabric } from "fabric";
import { useContext, useEffect, useState } from "react";

interface CanvasPositionProps {
  position: string;
  height: number;
  width: number;
}

const CanvasPosition: React.FC<CanvasPositionProps> = ({
  position,
  height,
  width,
}) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  const { storeCanvas, switchTab } = useContext(fabricContext);
  const { saveCanvasState, loadCanvasState } = useMenuOps();

  useEffect(() => {
    const initCanvas = () => {
      const c = new fabric.Canvas("canvas", {
        height,
        width,
      });
      setCanvas(c);
      storeCanvas(c);

      loadCanvasState(c, position);

      c.on("object:added", () => saveCanvasState(c, position));
      c.on("object:modified", () => saveCanvasState(c, position));
      c.on("object:removed", () => saveCanvasState(c, position));
      c.on("mouse:down", onSelectionChange);
      c.on("selection:created", onSelectionChange);
      c.on("selection:updated", onSelectionChange);
      c.on("selection:cleared", onSelectionChange);

      return c;
    };

    const c = initCanvas();
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

    function onSelectionChange(event: fabric.IEvent) {
      const activeObject = event.target;

      if (activeObject) {
        switch (activeObject.type) {
          case "image":
            switchTab("Picture");
            break;

          case "text":
            switchTab("Text");
            break;

          default:
        }
      }
    }

    canvas?.on("object:modified", (event: any) => {
      const modifiedObject = event.target;
      if (modifiedObject instanceof fabric.Text) {
        console.log(
          `Text has been resized to ${modifiedObject.width}x${modifiedObject.height} pixels`
        );
      }
    });

    return () => {
      try {
        c?.dispose();
      } catch (error) {
        console.error("Error disposing canvas:", error);
      }
    };
  }, [position]);

  return (
    <div className="absolute z-10">
      <canvas
        id="canvas"
        className="border-dashed border-2 border-red-500"
      ></canvas>
    </div>
  );
};

export default CanvasPosition;
