import { Textarea } from "@chakra-ui/react";
import React from "react";

const Notes: React.FC = () => {
  return (
    <div className="p-3 bg-gray-200 rounded-md flex-col space-y-3">
      <p className="text-sm font-bold text-gray-600">
        Notes/ need help removing the background? let us know!
      </p>
      <Textarea bg="white" width="50%" placeholder="Enter notes" />
    </div>
  );
};
export default Notes;
