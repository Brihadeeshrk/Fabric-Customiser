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
  const [color, setColor] = React.useState("#ddd");
  const [isPickerVisible, setIsPickerVisible] = React.useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const activeObject = canvas?.getActiveObject() as fabric.Text;
      if (activeObject && activeObject.type === "text") {
        setTextValue(activeObject.text || "");
        setIsUpdateMode(true);
        setColor(color);
      } else {
        setTextValue("");
        setIsUpdateMode(false);
      }
    };

    canvas?.on("selection:cleared", handleSelectionChange);
    canvas?.on("selection:updated", handleSelectionChange);
    canvas?.on("selection:created", handleSelectionChange);

    return () => {
      canvas?.off("selection:cleared", handleSelectionChange);
      canvas?.off("selection:updated", handleSelectionChange);
      canvas?.off("selection:created", handleSelectionChange);
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
      <div
        className={`w-9 h-9 cursor-pointer border border-black rounded-sm `}
        style={{ backgroundColor: color }}
        onClick={toggleColorPicker}
        title="Click to change color"
      />
      {isPickerVisible && (
        <div>
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default TextTab;
