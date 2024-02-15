import { fabricContext } from "@/store/context";
import { fabric } from "fabric";
import { useContext } from "react";

const useFabricOps = () => {
  const { canvas } = useContext(fabricContext);

  const addText = (text: string, color: string) => {
    const obj = new fabric.Text(text, {
      left: 0,
      top: 0,
      fontSize: 36,
      fontFamily: "Arial",
    });
    canvas?.add(obj);
    canvas?.requestRenderAll();
    obj.set("fill", `${color}`);
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
  };

  const updateText = (textObject: fabric.Text, newText: string) => {
    textObject.set("text", newText);
    canvas?.renderAll();
  };

  const updateColor = (textObject: fabric.Text, color: string) => {
    textObject.set("fill", `${color}`);
  };

  return {
    addText,
    addImage,
    updateText,
    updateColor,
  };
};
export default useFabricOps;
