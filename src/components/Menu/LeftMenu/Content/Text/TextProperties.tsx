import { Input } from "@chakra-ui/react";
import React from "react";

interface TextPropertiesProps {
  fontSize: number;

  onFontSizeChange: (newFontSize: number) => void;
}

const TextProperties: React.FC<TextPropertiesProps> = ({
  fontSize,

  onFontSizeChange,
}) => {
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFontSize = parseInt(e.target.value);
    onFontSizeChange(newFontSize);
  };

  return (
    <div className="flex space-x-5">
      <div className="flex flex-col items-center">
        <label className="text-sm text-gray-00" htmlFor="fontSize">
          Font Size
        </label>
        <Input
          type="number"
          id="fontSize"
          value={fontSize}
          onChange={handleFontSizeChange}
          min={10}
          max={100}
        />
      </div>
    </div>
  );
};

export default TextProperties;
