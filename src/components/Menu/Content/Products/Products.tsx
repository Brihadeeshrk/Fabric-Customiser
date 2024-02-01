import { Combobox } from "./combobox";
import React from "react";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  return (
    <div className="flex justify-center">
      <Combobox />
    </div>
  );
};
export default Products;
