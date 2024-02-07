import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFabricOps from "@/hooks/fabricOps";
import React from "react";

interface TextTabProps {}

const TextTab: React.FC<TextTabProps> = () => {
  const { addText } = useFabricOps();
  const [textValue, setTextValue] = React.useState("");

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
      <Button onClick={() => addText(textValue)}>Add Text</Button>
    </div>
  );
};
export default TextTab;
