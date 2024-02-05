import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface QrcodeProps {}

const Qrcode: React.FC<QrcodeProps> = () => {
  return (
    <div className="space-y-3">
      <Input type="text" placeholder="Enter link for QRcode" />
      <Button>Generate</Button>
    </div>
  );
};
export default Qrcode;
