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
  const [opacity, setOpacity] = useState(1);
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
        setOpacity(activeObject.opacity || 1);
      } else {
        setTextValue("");
        setIsUpdateMode(false);
        setOpacity(1);
      }
    };

    canvas?.on("selection:cleared", handleSelectionChange);
    canvas?.on("selection:updated", handleSelectionChange);
    canvas?.on("selection:created", handleSelectionChange);
    canvas?.on("selection:cleared", () => {
      setIsBoldActive(false);
      setIsItalicActive(false);
      setIsUnderlineActive(false);
      setOpacity(1);
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
  enum TextStyleType {
    Bold = "bold",
    Italic = "italic",
    Underline = "underline",
  }

  const toggleTextStyle = (styleType: TextStyleType) => {
    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject?.type !== "text") return;

    switch (styleType) {
      case TextStyleType.Bold:
        const isBold =
          activeObject.fontWeight === "bold" || activeObject.fontWeight === 700;
        activeObject.set("fontWeight", isBold ? "normal" : "bold");
        setIsBoldActive(!isBoldActive);
        break;
      case TextStyleType.Italic:
        const isItalic = activeObject.fontStyle === "italic";
        activeObject.set("fontStyle", isItalic ? "" : "italic");
        setIsItalicActive(!isItalicActive);
        break;
      case TextStyleType.Underline:
        const isUnderline = !!activeObject.underline;
        activeObject.set("underline", !isUnderline);
        setIsUnderlineActive(!isUnderlineActive);
        break;
    }

    canvas?.requestRenderAll();
  };
  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOpacity = parseFloat(e.target.value);
    setOpacity(newOpacity);

    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject && activeObject.type === "text") {
      activeObject.set({ opacity: newOpacity });
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
          onClick={() => toggleTextStyle(TextStyleType.Bold)}
        >
          B
        </div>
        <div
          className={`w-9 h-9 flex items-center italic justify-center cursor-pointer border border-black rounded-sm ${
            isItalicActive ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => toggleTextStyle(TextStyleType.Italic)}
        >
          I
        </div>
        <div
          className={`w-9 h-9 flex underline items-center justify-center cursor-pointer border border-black rounded-sm ${
            isUnderlineActive
              ? "bg-gray-700 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => toggleTextStyle(TextStyleType.Underline)}
        >
          U
        </div>
      </div>
      <div>
        transparency:
        <div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={opacity}
            onChange={handleOpacityChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TextTab;
