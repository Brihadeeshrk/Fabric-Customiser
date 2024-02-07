import { fabricContext } from "@/store/context";
import { fabric } from "fabric";
import { useContext } from "react";

const useFabricOps = () => {
  const { canvas } = useContext(fabricContext);
  const addRect = (canvas?: fabric.Canvas) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      stroke: "#2BEBC8",
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  };

  const addText = (text: string) => {
    const obj = new fabric.Text(text, { left: 100, top: 100 });
    canvas?.add(obj);
    canvas?.requestRenderAll();
    obj.set("fill", "red");
  };

  const removeText = () => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject && activeObject.type === "text") {
        canvas.remove(activeObject);
        canvas.requestRenderAll();
      }
    }
  };

  return {
    addRect,
    addText,
    removeText,
  };
};
export default useFabricOps;
