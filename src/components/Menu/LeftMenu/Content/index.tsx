import React from "react";
import TextTab from "./Text/TextTab";
import Upload from "./Upload/Upload";

interface ContentProps {
  currentTab: string;
}

const Content: React.FC<ContentProps> = ({ currentTab }) => {
  return (
    <div className="flex-col items-center justify-center space-y-7 overflow-auto">
      <p className="text-xl text-gray-700 font-semibold text-center">
        {currentTab}
      </p>

      <div>
        {currentTab === "Upload Image" && <Upload />}
        {currentTab === "Insert Text" && <TextTab />}
      </div>
    </div>
  );
};
export default Content;
