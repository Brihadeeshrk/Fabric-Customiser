import React from "react";
import Products from "./Products/Products";
import Assets from "./Assets/Assets";
import Upload from "./Upload/Upload";
import Qrcode from "./Qrcode/Qrcode";
import Draw from "./Draw/Draw";
import TextTab from "./Text/TextTab";
import Wordcloud from "./Wordcloud/Wordcloud";

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
        {currentTab === "Products" && <Products />}
        {currentTab === "Assets" && <Assets />}
        {currentTab === "Upload Image" && <Upload />}
        {currentTab === "QRCode" && <Qrcode />}
        {currentTab === "Draw" && <Draw />}
        {currentTab === "Insert Text" && <TextTab />}
        {currentTab === "Word Cloud" && <Wordcloud />}
      </div>
    </div>
  );
};
export default Content;
