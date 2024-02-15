import { Button, Flex, Image, Input } from "@chakra-ui/react";
import useFabricOps from "@/hooks/fabricOps";
import React, { useContext, useEffect, useRef, useState } from "react";
import { fabricContext } from "@/store/context";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { fabric } from "fabric";

import { Label } from "@/components/ui/label";

const radioOptions: Array<string> = [
  "Grayscale",
  "Sepia",
  "Invert",
  "Pixelate",
];
const Upload: React.FC = () => {
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
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

  const handleRemoveImage = () => {
    const activeObject = canvas?.getActiveObject() as fabric.Image;
    if (activeObject) {
      canvas?.remove(activeObject);
    }
    setImageWidth(null);
    setImageHeight(null);
    setActiveFilters([]);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(event.target.value, 10);
    if (!isNaN(newWidth) && canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject?.type === "image") {
        const image = activeObject as fabric.Image;
        if (image.width) {
          const scaleX = newWidth / image.width;
          image.scaleX = scaleX;
          canvas.requestRenderAll();
          setImageWidth(newWidth);
        }
      }
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(event.target.value, 10);
    if (!isNaN(newHeight) && canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject?.type === "image") {
        // Assuming activeObject is an image, thus it has height.
        const image = activeObject as fabric.Image;
        if (image.height) {
          const scaleY = newHeight / image.height;
          image.scaleY = scaleY;
          canvas.requestRenderAll();
          setImageHeight(newHeight);
        }
      }
    }
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    const activeObject = canvas?.getActiveObject() as fabric.Image;
    if (activeObject) {
      const validFilters = filters.filter(
        (filter) => filter in fabric.Image.filters
      );

      activeObject.filters = validFilters.map(
        (filter) => new (fabric.Image.filters as any)[filter]()
      );
      activeObject.applyFilters();
      canvas?.requestRenderAll();
    }
  };

  if (typeof window !== "undefined")
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
                    value={imageWidth || ""}
                    onChange={handleWidthChange}
                    placeholder="Width"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-700">Height</p>
                  <Input
                    type="number"
                    value={imageHeight || ""}
                    onChange={handleHeightChange}
                    placeholder="Height"
                  />
                </div>
              </Flex>

              <div className="space-y-2">
                <p className="text-sm text-gray-700">Filters</p>

                <CheckboxGroup
                  onChange={handleFilterChange}
                  value={activeFilters}
                >
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                    {radioOptions.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox value={option} id={`r${index}`} />
                        <Label htmlFor={`r${index}`}>{option}</Label>
                      </div>
                    ))}
                  </div>
                </CheckboxGroup>
              </div>

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
