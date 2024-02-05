import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface TextTabProps {}

const TextTab: React.FC<TextTabProps> = () => {
  return (
    <div className="space-y-4">
      <Input type="text" placeholder="Enter text" />
      <Button>Add Text</Button>
    </div>
  );
};
export default TextTab;
