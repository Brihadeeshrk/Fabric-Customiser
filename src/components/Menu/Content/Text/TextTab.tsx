import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useFabricOps from "@/hooks/fabricOps";
import { fabricContext } from "@/store/context";
import { Select } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
} from "react-icons/md";
import TextProperties from "./TextProperties";

interface TextTabProps {}

const fonts: Array<string> = [
  "Arial",
  "Geneva",
  "Helvetica",
  "Lobster",
  "Verdana",
  "Times New Roman",
  "Montserrat",
  "Pr Sans",
  "Ubuntu",
  "Open Sans",
  "Playfair Display",
  "Comic Book",
  "Oxyzen",
  "Play",
  "Gloria Hallelujah",
  "Amaranth",
  "Arcade",
  "Handlee",
  "Domin",
  "Satisfy",
];

const TextTab: React.FC<TextTabProps> = () => {
  const { addText, updateText, updateColor } = useFabricOps();
  const { canvas } = useContext(fabricContext);
  const [textValue, setTextValue] = useState<string>("");
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const selectedObject = canvas?.getActiveObject() as fabric.Text;
  const [color, setColor] = useState<string>("#000");
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [isBoldActive, setIsBoldActive] = useState<boolean>(false);
  const [isItalicActive, setIsItalicActive] = useState<boolean>(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState<boolean>(false);
  const [selectedFontFamily, setSelectedFontFamily] = useState<string>("Arial");
  const [opacity, setOpacity] = useState<number>(1);
  const [fontSize, setFontSize] = useState(36);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const activeObject = canvas?.getActiveObject() as fabric.Text;
      if (activeObject && activeObject.type === "text") {
        setTextValue(activeObject.text || "");
        setIsUpdateMode(true);
        setColor((activeObject.fill as string) || "#000");
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
        setColor("#000");
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
      setColor("#000");
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

  const handleFontSizeChange = (newFontSize: number) => {
    setFontSize(newFontSize);
    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject && activeObject.type === "text") {
      activeObject.set("fontSize", newFontSize);
      canvas?.requestRenderAll();
    }
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject && activeObject.type === "text") {
      updateColor(activeObject, newColor);
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

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedFontFamily = event.target.value;
    setSelectedFontFamily(selectedFontFamily);

    const activeObject = canvas?.getActiveObject() as fabric.Text;
    if (activeObject && activeObject.type === "text") {
      activeObject.set("fontFamily", selectedFontFamily);
      canvas?.requestRenderAll();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-gray-600">
          {selectedObject && isUpdateMode
            ? "Update text."
            : "Enter text below."}
        </p>
        <Input
          ref={inputRef}
          value={textValue}
          onChange={onChangeHandler}
          type="text"
          placeholder="Enter text"
        />
      </div>

      {selectedObject && selectedObject.type === "text" && (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">Choose font family</p>
            <Select
              value={selectedFontFamily}
              onChange={handleFontFamilyChange}
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </Select>
          </div>

          <div className="flex">
            <ToggleGroup type="multiple" variant="outline">
              <ToggleGroupItem
                value="bold"
                aria-label="Toggle bold"
                onClick={() => toggleTextStyle(TextStyleType.Bold)}
              >
                <MdFormatBold className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                aria-label="Toggle italic"
                onClick={() => toggleTextStyle(TextStyleType.Italic)}
              >
                <MdFormatItalic className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem
                value="underline"
                aria-label="Toggle underline"
                onClick={() => toggleTextStyle(TextStyleType.Underline)}
              >
                <MdFormatUnderlined className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <TextProperties
            fontSize={fontSize}
            onFontSizeChange={handleFontSizeChange}
          />

          <div className="flex align-center justify-center w-1/2">
            <Input
              type="text"
              value={color.toUpperCase()}
              onChange={handleHexInputChange}
              className="border-b border-b-black bg-transparent p-1 w-full outline-none mr-4"
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
          <div className="flex items-center">
            <p className="mr-3 text-sm text-gray-600">Transparency:</p>
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
      )}

      <div className="flex space-x-5">
        <Button onClick={handleButtonClick}>
          {isUpdateMode ? "Update" : "Add Text"}
        </Button>

        {isUpdateMode && (
          <Button
            variant="destructive"
            onClick={() => canvas?.remove(selectedObject)}
          >
            Delete Text
          </Button>
        )}
      </div>
    </div>
  );
};

export default TextTab;
