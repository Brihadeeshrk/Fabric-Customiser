import React from "react";
import FabricCanvas from "../Canvas";
import Menu from "../Menu/LeftMenu";
import TopMenu from "../Menu/TopMenu/TopMenu";
import Customisation from "./Customisation";
import DesignPosition from "./DesignPosition";

interface EditorProps {}

const Editor: React.FC<EditorProps> = () => {
  return (
    <div className="flex">
      <div className="w-1/4 p-3">
        <Menu />
      </div>

      <div className="flex flex-col w-3/4 p-3 space-y-5">
        <Customisation />

        <TopMenu />
        <div className="flex space-x-5 mt-5">
          <div className="p-5 w-11/12 bg-fabric-container">
            <FabricCanvas />
          </div>
        </div>

        <DesignPosition />
      </div>
    </div>
  );
};
export default Editor;
