import { Button, Flex, Image, Input } from "@chakra-ui/react";
import useFabricOps from "@/hooks/fabricOps";
import React, { useContext, useEffect, useRef, useState } from "react";
import { fabricContext } from "@/store/context";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const radioOptions: Array<string> = [
  "Grayscale",
  "Sepia",
  "Invert",
  "Emboss",
  "Sharpen",
];

const Upload: React.FC = () => {
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
        setImageWidth(image.width || 0);
        setImageHeight(image.height || 0);
      } else {
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
        addImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = () => {
    handleRemoveImage();
    fileButtonRef.current?.click();
  };

  const handleRemoveImage = () => {
    const activeObject = canvas?.getActiveObject() as fabric.Image;
    if (activeObject) {
      canvas?.remove(activeObject);
    }
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
      {canvas?.getActiveObject() instanceof window.fabric.Image ? (
        <>
          <Flex direction="column" align="center" gap={6}>
            <Image
              width={"50%"}
              src={canvas?.getActiveObject()?.toDataURL({})}
              alt="Selected"
            />
            <Flex mt={3} justify={"space-evenly"} className="space-x-3">
              <div>
                <p className="text-sm text-gray-700">Width</p>
                <Input
                  type="number"
                  value={imageWidth || 0}
                  onChange={handleWidthChange}
                  placeholder="Width"
                />
              </div>
              <div>
                <p className="text-sm text-gray-700">Height</p>
                <Input
                  type="number"
                  value={imageHeight || 0}
                  onChange={handleHeightChange}
                  placeholder="Height"
                />
              </div>
            </Flex>

            <RadioGroup defaultValue="comfortable">
              <div className="grid grid-cols-3 gap-3">
                {radioOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`r${index}`} />
                    <Label htmlFor={`r${index}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            <Button bg="red" color={"white"} onClick={handleRemoveImage}>
              Remove Image
            </Button>
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
