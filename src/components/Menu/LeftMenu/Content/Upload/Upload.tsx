import { Button, Flex, Image } from "@chakra-ui/react";
import useFabricOps from "@/hooks/fabricOps";
import React, { useContext, useEffect, useRef, useState } from "react";
import { fabricContext } from "@/store/context";

interface UploadProps {
  onImageSelect: (file: File) => void;
}

const Upload: React.FC<UploadProps> = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileButtonRef = useRef<HTMLInputElement>(null);
  const { canvas } = useContext(fabricContext);
  const { addImage } = useFabricOps();

  useEffect(() => {
    const handleSelectionChange = () => {
      const activeObject = canvas?.getActiveObject();
      if (activeObject instanceof window.fabric.Image) {
        setSelectedImage((activeObject as fabric.Image).toDataURL({}));
      } else {
        setSelectedImage(null);
      }
    };

    canvas?.on("selection:updated", handleSelectionChange);
    canvas?.on("selection:created", handleSelectionChange);
    canvas?.on("selection:cleared", handleSelectionChange);

    return () => {
      canvas?.off("selection:updated", handleSelectionChange);
      canvas?.off("selection:created", handleSelectionChange);
      canvas?.off("selection:cleared", handleSelectionChange);
    };
  }, [canvas]);

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
      addImage(selectedFile);
    }
  };

  const handleChangeImage = () => {
    setSelectedImage(null);
    fileButtonRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
  };

  return (
    <div>
      {selectedImage ? (
        <>
          <Flex direction="column" align="center">
            <Image width={"50%"} src={selectedImage} alt="Selected" />
            <Flex mt={3} width="100%" justify={"space-evenly"}>
              <Button bg="black" color={"white"} onClick={handleChangeImage}>
                Change Image
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
