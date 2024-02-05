import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

interface WordcloudProps {}

const Wordcloud: React.FC<WordcloudProps> = () => {
  return (
    <div className="space-y-4">
      <Input type="text" placeholder="Enter words below" />
      <Button>Add word cloud</Button>
    </div>
  );
};
export default Wordcloud;
