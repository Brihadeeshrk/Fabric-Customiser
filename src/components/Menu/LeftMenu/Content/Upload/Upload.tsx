import { Button, Flex, Image, Input } from "@chakra-ui/react";
import useFabricOps from "@/hooks/fabricOps";
import React, { useContext, useEffect, useRef, useState } from "react";
import { fabricContext } from "@/store/context";

interface UploadProps {
  onImageSelect: (file: File) => void;
}

const Upload: React.FC<UploadProps> = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const fileButtonRef = useRef<HTMLInputElement>(null);
  const { canvas } = useContext(fabricContext);
  const { addImage } = useFabricOps();

  useEffect(() => {
    const handleSelectionChange = () => {
      const activeObject = canvas?.getActiveObject();
      if (activeObject instanceof window.fabric.Image) {
        const image = activeObject as fabric.Image;
        setSelectedImage(image.toDataURL({}));
        setImageWidth(image.width || 0);
        setImageHeight(image.height || 0);
      } else {
        setSelectedImage(null);
        setImageWidth(null);
        setImageHeight(null);
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
    setImageWidth(null);
    setImageHeight(null);
  };

  const handleContinue = () => {
    if (selectedFile) {
      addImage(selectedFile);
    }
  };

  const handleChangeImage = () => {
    setSelectedImage(null);
    setImageWidth(null);
    setImageHeight(null);
    fileButtonRef.current?.click();
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setImageWidth(null);
    setImageHeight(null);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const width = parseInt(event.target.value);
    if (!isNaN(width)) {
      setImageWidth(width);
      const activeObject = canvas?.getActiveObject() as fabric.Image;
      if (activeObject) {
        activeObject.set("width", width);
        canvas?.requestRenderAll();
      }
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const height = parseInt(event.target.value);
    if (!isNaN(height)) {
      setImageHeight(height);
      const activeObject = canvas?.getActiveObject() as fabric.Image;
      if (activeObject) {
        activeObject.set("height", height);
        canvas?.requestRenderAll();
      }
    }
  };

  return (
    <div>
      {selectedImage ? (
        <>
          <Flex direction="column" align="center">
            <Image width={"50%"} src={selectedImage} alt="Selected" />
            <Flex mt={3} width="100%" justify={"space-evenly"}>
              <Input
                type="number"
                value={imageWidth || 0}
                onChange={handleWidthChange}
                placeholder="Width"
              />
              <Input
                type="number"
                value={imageHeight || 0}
                onChange={handleHeightChange}
                placeholder="Height"
              />
            </Flex>
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
      {selectedImage && (
        <Flex mt={3} width="100%" justify={"space-evenly"}>
          <Button bg="red" color={"white"} onClick={handleRemoveImage}>
            Remove Image
          </Button>
        </Flex>
      )}
    </div>
  );
};

export default Upload;
