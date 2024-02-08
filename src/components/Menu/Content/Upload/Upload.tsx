// import { Button } from "@/components/ui/button";
import useFabricOps from "@/hooks/fabricOps";
import { Button, Flex, Image } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

interface UploadProps {
  onImageSelect: (file: File) => void;
}

const Upload: React.FC<UploadProps> = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileButtonRef = useRef<HTMLInputElement>(null);
  const { addImage } = useFabricOps(); // Import useFabricOps hook directly

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgSrc = e.target?.result as string;
        setSelectedImage(imgSrc);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleChooseAnotherImage = () => {
    setSelectedImage(null);
  };

  const handleContinue = () => {
    if (selectedFile) {
      addImage(selectedFile); // Call addImage function with selected image URL
    }
  };

  return (
    <div>
      {selectedImage ? (
        <>
          <Flex direction="column" align="center">
            <Image width={"50%"} src={selectedImage} alt="Selected" />
            <Flex mt={3} width="100%" justify={"space-evenly"}>
              <Button
                bg="red"
                color={"white"}
                onClick={handleChooseAnotherImage}
              >
                Choose Another Image
              </Button>
              <Button bg="black" color={"white"} onClick={handleContinue}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </>
      ) : (
        <>
          <Button
            bg="black"
            color={"white"}
            onClick={() => fileButtonRef.current?.click()}
          >
            Upload Image
          </Button>
          <input
            hidden
            ref={fileButtonRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
};

export default Upload;
