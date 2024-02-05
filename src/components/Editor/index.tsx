import React from "react";
import Menu from "../Menu";

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
  return (
    <div className="flex">
      <div className="w-1/4 p-3">
        <Menu />
      </div>
      <div className="w-3/4 p-3 bg-fabric-container">Fabric Canvas</div>
    </div>
  );
};
export default Editor;
