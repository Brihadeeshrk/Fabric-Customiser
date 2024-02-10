"use client";
import React from "react";

interface AssetsProps {}

const AssetTypes: Array<string> = [
  "Badges",
  "Cliparts",
  "Country flags",
  "Flat icons",
  "Quotes",
  "Shapes",
  "Zodiac signs",
];

const Assets: React.FC<AssetsProps> = () => {
  return (
    <div className="flex flex-wrap w-full">
      {AssetTypes.map((asset) => (
        <div
          className="w-[calc(33.33% - 4px)] bg-gray-100 border p-3 cursor-pointer mb-4 mr-4"
          key={asset}
        >
          <p className="uppercase text-sm text-gray-700">{asset}</p>
        </div>
      ))}
    </div>
  );
};

export default Assets;
