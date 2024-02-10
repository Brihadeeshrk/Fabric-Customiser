import React from "react";
import Tabs from "./Tabs";

type RightMenuProps = {};

const RightMenu: React.FC<RightMenuProps> = () => {
  return (
    <div className="flex flex-col items-center">
      <Tabs />
    </div>
  );
};
export default RightMenu;
