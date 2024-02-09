import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFabricOps from "@/hooks/fabricOps";
import { fabricContext } from "@/store/context";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface TextTabProps {}

const TextTab: React.FC<TextTabProps> = () => {
  const { addText, updateText, updateColor } = useFabricOps();
  const { canvas } = useContext(fabricContext);
  const [textValue, setTextValue] = useState<string>("");
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const selectedObject = canvas?.getActiveObject() as fabric.Text;
  const [color, setColor] = React.useState("#000");
  const [isPickerVisible, setIsPickerVisible] = React.useState(false);
  const [isBoldActive, setIsBoldActive] = React.useState(false);
  const [isItalicActive, setIsItalicActive] = React.useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = React.useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const activeObject = canvas?.getActiveObject() as fabric.Text;
      if (activeObject && activeObject.type === "text") {
        setTextValue(activeObject.text || "");
        setIsUpdateMode(true);
        setColor(color);
        setIsBoldActive(
          activeObject.fontWeight === "bold" || activeObject.fontWeight === 700
        );
        setIsItalicActive(activeObject.fontStyle === "italic");
        setIsUnderlineActive(!!activeObject.underline);
      } else {
        setTextValue("");
        setIsUpdateMode(false);
      }
    };

    canvas?.on("selection:cleared", handleSelectionChange);
    canvas?.on("selection:updated", handleSelectionChange);
    canvas?.on("selection:created", handleSelectionChange);
    canvas?.on("selection:cleared", () => {
      setIsBoldActive(false);
      setIsItalicActive(false);
      setIsUnderlineActive(false);
    });

    return () => {
      canvas?.off("selection:cleared", handleSelectionChange);
      canvas?.off("selection:updated", handleSelectionChange);
      canvas?.off("selection:created", handleSelectionChange);
      canvas?.off("selection:cleared");
    };
  }, [canvas]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };
  const toggleColorPicker = () => {
    setIsPickerVisible(!isPickerVisible);
  };

  const handleButtonClick = () => {
    if (isUpdateMode && selectedObject) {
      updateText(selectedObject, textValue);
    } else {
      addText(textValue, color);
    }
    setTextValue("");
  };
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    const selectedObject = canvas?.getActiveObject() as fabric.Text;
    if (selectedObject && selectedObject.type === "text") {
      updateColor(selectedObject, newColor);
      canvas?.requestRenderAll();
    }
  };
  const handleHexInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    handleColorChange(newColor);
  };
  const toggleBold = () => {
    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject && activeObject.type === "text") {
      const isBold =
        activeObject.fontWeight === "bold" || activeObject.fontWeight === 700;
      activeObject.set("fontWeight", isBold ? "normal" : "bold");

      setIsBoldActive(!isBoldActive);
      canvas?.requestRenderAll();
    }
  };
  const toggleItalic = () => {
    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject?.type === "text") {
      const isItalic = activeObject.fontStyle === "italic";
      activeObject.set("fontStyle", isItalic ? "" : "italic");

      setIsItalicActive(!isItalicActive);
      canvas?.requestRenderAll();
    }
  };

  const toggleUnderline = () => {
    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject?.type === "text") {
      const isUnderline = activeObject.underline;
      activeObject.set("underline", !isUnderline);
      setIsUnderlineActive(!isUnderlineActive);
      canvas?.requestRenderAll();
    }
  };
  return (
    <div className="space-y-4">
      <Input
        ref={inputRef}
        value={textValue}
        onChange={onChangeHandler}
        type="text"
        placeholder="Enter text"
      />
      <Button onClick={handleButtonClick}>
        {isUpdateMode ? "Update" : "Add Text"}
      </Button>
      <div className="flex align-center justify-center">
        <input
          type="text"
          value={color.toUpperCase()}
          onChange={handleHexInputChange}
          className="border-b border-black bg-transparent p-1 w-[100px] outline-none mr-4"
          placeholder="#FFFFFF"
        />
        <div
          className={`w-9 h-9 cursor-pointer border border-black rounded-sm `}
          style={{ backgroundColor: color }}
          onClick={toggleColorPicker}
          title="Click to change color"
        />
      </div>

      {isPickerVisible && (
        <div>
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
      <div className="flex space-x-2 justify-center">
        <div
          className={`w-9 h-9 flex font-bold items-center justify-center cursor-pointer border border-black rounded-sm ${
            isBoldActive ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={toggleBold}
        >
          B
        </div>
        <div
          className={`w-9 h-9 flex items-center italic justify-center cursor-pointer border border-black rounded-sm ${
            isItalicActive ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={toggleItalic}
        >
          I
        </div>
        <div
          className={`w-9 h-9 flex underline items-center justify-center cursor-pointer border border-black rounded-sm ${
            isUnderlineActive
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={toggleUnderline}
        >
          U
        </div>
      </div>
    </div>
  );
};

export default TextTab;
