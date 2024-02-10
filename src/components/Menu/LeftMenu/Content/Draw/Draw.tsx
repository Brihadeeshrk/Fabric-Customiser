import { Button } from "@/components/ui/button";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DrawProps {}

const radioOptions: Array<string> = [
  "Pencil",
  "Circle",
  "Spray",
  "Pattern",
  "H-line",
  "V-line",
  "Square",
  "Diamond",
];

const Draw: React.FC<DrawProps> = () => {
  return (
    <div className="space-y-4">
      <Button>Cancel drawing mode</Button>
      <RadioGroup defaultValue="comfortable">
        <div className="grid grid-cols-3 gap-3">
          {radioOptions.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`r${index}`} />
              <Label htmlFor={`r${index}`}>{option}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
export default Draw;
