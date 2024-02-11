import { fabricContext } from "@/store/context";
import { fabric } from "fabric";
import { useContext } from "react";
import useCanvasUndoRedo from "./CanvasUndoRedo";

const useFabricOps = () => {
  const { canvas } = useContext(fabricContext);
  const { saveCanvasState, undo, redo } = useCanvasUndoRedo();

  const addRect = (canvas?: fabric.Canvas) => {
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      stroke: "#2BEBC8",
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
    if (canvas) {
      saveCanvasState(canvas);
    }
  };

  const addText = (text: string, color: string) => {
    const obj = new fabric.Text(text, {
      left: 100,
      top: 100,
      fontSize: 36,
      fontFamily: "Arial",
    });
    canvas?.add(obj);
    canvas?.requestRenderAll();
    obj.set("fill", `${color}`);
    if (canvas) {
      saveCanvasState(canvas);
    }
  };

  const addImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgSrc = e.target?.result as string;
      fabric.Image.fromURL(
        imgSrc,
        (img) => {
          const imgWidth = img.width ?? 1;
          const imgHeight = img.height ?? 1;
          const scale = Math.min(200 / imgWidth, 200 / imgHeight);
          img.scale(scale);
          canvas?.add(img).renderAll();
        },
        { crossOrigin: "anonymous" }
      );
    };
    reader.readAsDataURL(file);
    if (canvas) {
      saveCanvasState(canvas);
    }
  };

  const updateText = (textObject: fabric.Text, newText: string) => {
    textObject.set("text", newText);
    canvas?.renderAll();
    if (canvas) {
      saveCanvasState(canvas);
    }
  };

  const updateColor = (textObject: fabric.Text, color: string) => {
    textObject.set("fill", `${color}`);
    if (canvas) {
      saveCanvasState(canvas);
    }
  };

  return {
    addRect,
    addText,
    addImage,
    updateText,
    updateColor,
    undo,
    redo,
  };
};
export default useFabricOps;
