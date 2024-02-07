import React from "react";
import Menu from "../Menu";
import FabricCanvas from "../Canvas";

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
  return (
    <div className="flex">
      <div className="w-1/4 p-3">
        <Menu />
      </div>
      <div className="w-3/4 p-3 bg-fabric-container h-full">
        <FabricCanvas />
      </div>
    </div>
  );
};
export default Editor;
