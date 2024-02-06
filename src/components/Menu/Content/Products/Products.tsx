import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  return (
    <div className="flex justify-center">
      {/* <Combobox /> */}
      <Select>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Select Products.." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default Products;
