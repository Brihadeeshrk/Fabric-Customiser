import { Button } from "@/components/ui/button";
import React from "react";

interface UploadProps {}

const Upload: React.FC<UploadProps> = () => {
  return (
    <div>
      <Button>Choose File</Button>
    </div>
  );
};
export default Upload;
