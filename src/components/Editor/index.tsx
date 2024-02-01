import React from "react";
import Menu from "../Menu";

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
  return (
    <div className="flex">
      <div className="border border-red-300 w-1/4 p-3">
        <Menu />
      </div>
      <div className="border border-blue-3000 w-3/4 p-3">Fabric Canvas</div>
    </div>
  );
};
export default Editor;
