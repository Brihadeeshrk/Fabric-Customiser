import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFabricOps from "@/hooks/fabricOps";
import { fabricContext } from "@/store/context";
import React, { useContext, useEffect, useState } from "react";

interface TextTabProps {}

const TextTab: React.FC<TextTabProps> = () => {
  const { addText } = useFabricOps();
  const { canvas } = useContext(fabricContext);
  const [textValue, setTextValue] = useState<string>("");

  useEffect(() => {
    const handleSelectionChange = () => {
      const selectedObject = canvas?.getActiveObject();
      if (selectedObject && selectedObject.type === "text") {
        setTextValue((selectedObject as fabric.Text).text || "");
      } else {
        setTextValue("");
      }
    };

    canvas?.on("selection:created", handleSelectionChange);
    canvas?.on("selection:updated", handleSelectionChange);

    return () => {
      canvas?.off("selection:created", handleSelectionChange);
      canvas?.off("selection:updated", handleSelectionChange);
    };
  }, [canvas]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="space-y-4">
      <Input
        value={textValue}
        onChange={onChangeHandler}
        type="text"
        placeholder="Enter text"
      />
      <Button
        onClick={() => {
          addText(textValue);
          setTextValue("");
        }}
      >
        Add Text
      </Button>
    </div>
  );
};

export default TextTab;
