import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFabricOps from "@/hooks/fabricOps";
import { fabricContext } from "@/store/context";
import React, { useContext, useEffect, useRef, useState } from "react";

interface TextTabProps {}

const TextTab: React.FC<TextTabProps> = () => {
  const { addText, updateText } = useFabricOps();
  const { canvas } = useContext(fabricContext);
  const [textValue, setTextValue] = useState<string>("");
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const selectedObject = canvas?.getActiveObject() as fabric.Text;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const activeObject = canvas?.getActiveObject() as fabric.Text;
      if (activeObject && activeObject.type === "text") {
        setTextValue(activeObject.text || "");
        setIsUpdateMode(true);
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

  const handleButtonClick = () => {
    if (isUpdateMode && selectedObject) {
      updateText(selectedObject, textValue);
    } else {
      addText(textValue);
    }
    setTextValue("");
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
    </div>
  );
};

export default TextTab;
