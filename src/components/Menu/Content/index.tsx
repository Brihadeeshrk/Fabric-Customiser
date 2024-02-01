import React from "react";

interface ContentProps {
  currentTab: string;
}

const Content: React.FC<ContentProps> = ({ currentTab }) => {
  return (
    <div className="w-full border border-gray-400 flex items-center justify-center">
      <p className="text-xl uppercase text-gray-700 font-semibold">
        {currentTab}
      </p>
    </div>
  );
};
export default Content;
